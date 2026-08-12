
import useEmblaCarousel from 'embla-carousel-react'
import './projects-carousel.css'
import AutoScroll from 'embla-carousel-auto-scroll'
import { projects } from '@/data/projects'
import RightArrow from "@/assets/icons/arrow-right-regular-full.svg?react";

export const ProjectsCarousel = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true, startIndex: 2 }, [AutoScroll({ speed: .75, stopOnInteraction: false })])

    return (
        <div className="projects-carousel_embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {
                        projects.map((p) => (
                            <div className="embla__slide" key={p.name}>
                                <a
                                    href={p.slug ? `/projects/${p.slug}` : "#"}
                                    className="proj"
                                >
                                    <img
                                        src={p.featuredImage.src}
                                        width={p.featuredImage.width}
                                        height={p.featuredImage.height}
                                        alt={`${p.name} screenshot`}
                                        className="proj-image"
                                    />
                                    <div className="proj-content">
                                        <div className="proj-text">
                                            <div className="proj-tags">

                                                {p.tags?.map((tag, i) => (
                                                    <span key={i}>{tag}</span>
                                                ))}
                                            </div>

                                        </div>
                                        <div className="proj-content_bottom">
                                            <h3>{p.name}</h3>
                                            <div className="proj-arrow">
                                                <RightArrow width={18} />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}