import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { UseEmblaCarouselType } from 'embla-carousel-react'
import './arc-gallery.css'

import AutoScroll from 'embla-carousel-auto-scroll'

interface ArcGalleryProps {
    /**
     * One element per slide — each child gets its own arc slide.
     *
     * Astro hands a framework component's default slot over as a *single*
     * pre-rendered `<astro-slot>` node, so from an `.astro` file React would
     * otherwise see every image as one child and build one enormous slide. The
     * component splits that slot back apart after hydration; see `astroSlides`.
     */
    children?: ReactNode
    /**
     * Degrees the slide beside the center one tilts. This is the only knob for
     * the curve — the radius, and therefore how far each slide drops, is derived
     * from it, so rotation and drop can't fall out of step. Larger is a tighter
     * arc; slides further out tilt by more than a plain multiple of this, exactly
     * as points on a circle do.
     */
    arcAngle?: number
    /** How much each slide away from center shrinks (0.06 = 6% per step). */
    scaleStep?: number
    /** How much each slide away from center fades (0.2 = 20% per step). */
    opacityStep?: number
    /**
     * Caps the scale/opacity falloff so distant slides don't shrink away to
     * nothing. It deliberately does *not* clamp the arc itself — freezing the
     * geometry past a cutoff is what made far slides share one wrong angle.
     */
    maxDistance?: number
}

/** `embla-carousel` isn't a direct dependency, so borrow the api type from the hook. */
type EmblaApi = NonNullable<UseEmblaCarouselType[1]>

export const ArcGallery = ({
    children,
    arcAngle = 14,
    scaleStep = 0.07,
    opacityStep = 0.18,
    maxDistance = 4,
}: ArcGalleryProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        containScroll: false,
        skipSnaps: false,
    }, [AutoScroll({ speed: 0.75, stopOnInteraction: false })])
    // Flattens fragments and drops null/false, so a conditionally-rendered slide
    // doesn't leave an empty one behind.
    const reactSlides = Children.toArray(children)
    const rootRef = useRef<HTMLDivElement>(null)
    /** The markup of each element inside Astro's slot, once it's been split up. */
    const [astroSlides, setAstroSlides] = useState<string[] | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const slideNodesRef = useRef<HTMLElement[]>([])
    /** Horizontal gap (px) between the centers of two neighbouring slides. */
    const spacingRef = useRef(0)

    const slides: ReactNode[] = astroSlides
        ? astroSlides.map((html, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: html }} />
        ))
        : reactSlides

    /**
     * Used from React, `children` arrives as separate nodes and this does nothing.
     * Used from Astro, the whole slot arrives as one `<astro-slot>` element, so
     * take its children's markup and re-render it as one slide each. Reading the
     * DOM is the only way to get at it — React holds that subtree as opaque HTML
     * and never descends into it.
     */
    useLayoutEffect(() => {
        if (reactSlides.length !== 1 || astroSlides) return
        const slot = rootRef.current?.querySelector('astro-slot')
        if (!slot || slot.children.length < 2) return
        setAstroSlides(Array.from(slot.children).map((child) => child.outerHTML))
    }, [reactSlides.length, astroSlides])

    /**
     * Rides every slide on one circle, driven by where the slide actually is:
     * `x` is its measured distance from the middle of the viewport. The slides
     * keep the x Embla gives them, so the circle is the one passing through those
     * x positions:
     *
     *     radius = spacing / sin(arcAngle)     // arcAngle tilts the first neighbour
     *     θ      = asin(x / radius)            // tangent angle at that x
     *     drop   = radius - √(radius² - x²)    // = radius * (1 - cos θ)
     *
     * Both the tilt and the drop come off the same radius, so a slide's rotation
     * always matches the slope of the arc where it's sitting. Tilting by a flat
     * `distance * arcAngle` is only right for the first neighbour and visibly
     * over-rotates everything beyond it.
     *
     * Measuring x from the DOM rather than deriving it from `scrollProgress` also
     * sidesteps the loop bookkeeping in Embla's tween examples, which guesses
     * which side a wrapped slide came out on and gets it wrong often enough to
     * leave a far slide sitting upright as though it were centered.
     */
    // const applyArc = useCallback(
    //     (embla: EmblaApi) => {
    //         const spacing = spacingRef.current
    //         const viewport = embla.rootNode()
    //         const outerSlides = embla.slideNodes()
    //         if (!viewport || !spacing) return

    //         const sinStep = Math.sin((arcAngle * Math.PI) / 180)
    //         // A zero angle is a straight line — an infinite radius, no drop.
    //         const radius = sinStep > 0 ? spacing / sinStep : Infinity

    //         // Read every position first, write every style after: interleaving
    //         // getBoundingClientRect with style writes would thrash layout.
    //         const viewportRect = viewport.getBoundingClientRect()
    //         const viewportCenter = viewportRect.left + viewportRect.width / 2
    //         const offsets = outerSlides.map((slide) => {
    //             const rect = slide.getBoundingClientRect()
    //             return rect.left + rect.width / 2 - viewportCenter
    //         })

    //         offsets.forEach((x, slideIndex) => {
    //             const node = slideNodesRef.current[slideIndex]
    //             if (!node) return

    //             // `x` is where the slide genuinely is right now, so no loop
    //             // bookkeeping is needed: Embla's loop translation and the
    //             // auto-scroll offset are already baked into the measurement.
    //             const distance = x / spacing
    //             const magnitude = Math.abs(distance)

    //             // asin has no answer past the circle's horizontal reach, so a
    //             // slide beyond it settles at a right angle rather than going NaN.
    //             const ratio = Math.max(-1, Math.min(1, x / radius))
    //             const theta = Math.asin(ratio)
    //             const angle = (theta * 180) / Math.PI
    //             const drop = radius === Infinity ? 0 : radius * (1 - Math.cos(theta))
    //             // const scale = Math.max(0.5, 1 - Math.min(magnitude, maxDistance) * scaleStep)
    //             // const opacity = Math.max(0, 1 - magnitude * opacityStep)

    //             // node.style.transform = `translateY(${drop}px) rotate(${angle}deg)`
    //             // // node.style.opacity = String(opacity)
    //             // node.style.zIndex = String(Math.round(100 - magnitude * 10))
    //         })
    //     },
    //     [arcAngle, scaleStep, opacityStep, maxDistance]
    // )

    // useEffect(() => {
    //     if (!emblaApi) return

    //     const measure = () => {
    //         const slides = emblaApi.slideNodes()
    //         slideNodesRef.current = slides.map(
    //             (slide) => slide.querySelector('.arc-slide__inner') as HTMLElement
    //         )
    //         // `offsetLeft` on the outer slide is pure layout — the transform lives
    //         // on the inner element, so measuring here isn't reading back our own
    //         // output. Slide width is a percentage, so this changes on resize.
    //         spacingRef.current =
    //             slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : 0
    //     }

    //     const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    //     const onScroll = () => applyArc(emblaApi)
    //     const onReInit = () => {
    //         measure()
    //         applyArc(emblaApi)
    //         onSelect()
    //     }

    //     measure()
    //     applyArc(emblaApi)
    //     onSelect()

    //     emblaApi.on('select', onSelect)
    //     emblaApi.on('scroll', onScroll)
    //     emblaApi.on('slideFocus', onScroll)
    //     emblaApi.on('reInit', onReInit)

    //     return () => {
    //         emblaApi.off('select', onSelect)
    //         emblaApi.off('scroll', onScroll)
    //         emblaApi.off('slideFocus', onScroll)
    //         emblaApi.off('reInit', onReInit)
    //     }
    // }, [emblaApi, applyArc])

    // The slot split changes the slide count after Embla has already measured,
    // so it has to re-read the track.
    useEffect(() => {
        if (astroSlides) emblaApi?.reInit()
    }, [emblaApi, astroSlides])

    return (
        <div className="arc-gallery" ref={rootRef}>
            <div className="arc-gallery__viewport" ref={emblaRef}>
                <div className="arc-gallery__container">
                    {slides.map((child, index) => (
                        <div className="arc-slide" key={index}>
                            <button
                                type="button"
                                className={'arc-slide__inner'.concat(
                                    index === selectedIndex ? ' arc-slide__inner--selected' : ''
                                )}
                                tabIndex={index === selectedIndex ? -1 : 0}
                                aria-label={`Show image ${index + 1} of ${slides.length}`}
                                aria-current={index === selectedIndex}
                                onClick={() => emblaApi?.scrollTo(index)}
                            >
                                {child}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="arc-gallery__dots">
                {slides.map((_, index) => (
                    <button
                        type="button"
                        key={index}
                        className={'arc-gallery__dot'.concat(
                            index === selectedIndex ? ' arc-gallery__dot--selected' : ''
                        )}
                        aria-label={`Go to image ${index + 1}`}
                        aria-current={index === selectedIndex}
                        onClick={() => emblaApi?.scrollTo(index)}
                    />
                ))}
            </div> */}
            {/* <div className="arc-gallery_overlay"></div> */}
        </div>
    )
}
