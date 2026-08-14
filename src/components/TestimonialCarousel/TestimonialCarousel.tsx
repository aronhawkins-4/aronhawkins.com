import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './testimonial-carousel.css'
import { testimonials } from '@/data/testimonials'

export const TestimonialCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    )

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())

        setScrollSnaps(emblaApi.scrollSnapList())
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi])

    return (
        <div className="testimonial-carousel_embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {testimonials.map((testimonial, index) => (
                        <div className="embla__slide" key={testimonial.name}>
                            <div className="testimonial">
                                <p className="testimonial-quote reveal">"{testimonial.quote}"</p>
                                <p className="testimonial-name reveal">{testimonial.name}</p>
                                <p className="testimonial-title reveal">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <button
                        type="button"
                        key={index}
                        className={'embla__dot'.concat(
                            index === selectedIndex ? ' embla__dot--selected' : ''
                        )}
                        aria-label={`Go to testimonial ${index + 1}`}
                        aria-current={index === selectedIndex}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    )
}
