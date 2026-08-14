import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './client-carousel.css'
import centurionLogo from '@/assets/images/client-logos/centurion-logohorizontal-white.svg'
import onwardLogo from '@/assets/images/client-logos/onward-logo.png'
import rclcLogo from '@/assets/images/client-logos/rclc-logo.png'
import senderoLogo from '@/assets/images/client-logos/sendero-logo.avif'
import sidekickLogo from '@/assets/images/client-logos/sidekick-logo-horizontal-white.svg'
import omniLogo from '@/assets/images/client-logos/omnipgafrisco-logo-horizontal-white.svg'
import AutoScroll from 'embla-carousel-auto-scroll'

export const ClientCarousel = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoScroll({ speed: .75 })])

    return (
        <div className={`client-carousel_embla ${theme === "dark" ? "dark" : "light"}`}>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide"><img src={rclcLogo.src} alt="RCLC Logo" width="400" /></div>
                    <div className="embla__slide"><img src={omniLogo.src} alt="Omni Logo" width="400" /></div>
                    <div className="embla__slide"><img src={senderoLogo.src} alt="Sendero Logo" width="400" /></div>
                    <div className="embla__slide"><img src={centurionLogo.src} alt="Centurion Logo" width="400" /></div>
                    <div className="embla__slide"><img src={onwardLogo.src} alt="Onward Logo" width="400" /></div>
                    <div className="embla__slide"><img src={sidekickLogo.src} alt="Sidekick Logo" width="400" /></div>
                    <div className="embla__slide"><img src={rclcLogo.src} alt="RCLC Logo" width="400" /></div>
                    <div className="embla__slide"><img src={omniLogo.src} alt="Omni Logo" width="400" /></div>
                    <div className="embla__slide"><img src={senderoLogo.src} alt="Sendero Logo" width="400" /></div>
                    <div className="embla__slide"><img src={centurionLogo.src} alt="Centurion Logo" width="400" /></div>
                    <div className="embla__slide"><img src={onwardLogo.src} alt="Onward Logo" width="400" /></div>
                    <div className="embla__slide"><img src={sidekickLogo.src} alt="Sidekick Logo" width="400" /></div>


                </div>
            </div>

            <div className="embla__overlay"></div>
        </div>
    )
}