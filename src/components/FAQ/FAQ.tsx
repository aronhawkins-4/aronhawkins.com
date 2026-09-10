import { useEffect, useId, useRef, useState } from 'react'
import { animate, inView, stagger } from 'motion'
import './faq.css'
import { faqs as defaultFaqs } from '@/data/faqs'
import type { Faq } from '@/data/faqs'

interface FAQProps {
    /**
     * Questions to render. Defaults to every entry in `@/data/faqs` so the
     * common case needs no props — pass a subset to reuse the accordion on a
     * service page with only that service's questions.
     */
    items?: Faq[]
    /**
     * Let more than one panel stay open at a time. Off by default: one answer
     * at a time keeps the section from growing taller than the viewport while
     * someone reads.
     */
    allowMultiple?: boolean
    /** Index of the panel that starts open, or `null` for all closed. */
    defaultOpenIndex?: number | null
}

export const FAQ = ({
    items = defaultFaqs,
    allowMultiple = false,
    defaultOpenIndex = null,
}: FAQProps) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>(
        defaultOpenIndex === null ? [] : [defaultOpenIndex]
    )
    /**
     * `useId` rather than a hand-rolled counter so the ids the button and its
     * panel point at each other with survive hydration, and so two accordions
     * on one page can't collide.
     */
    const baseId = useId()

    const accordionRef = useRef<HTMLDivElement>(null)
    /**
     * The entrance stagger runs from here rather than from the global
     * `.reveal-stagger` observer in `Layout.astro`. That script writes inline
     * styles onto whatever it animates, and these items belong to a React
     * island — if it reached them before `client:load` hydration finished (easy
     * to hit: reload with the FAQ already on screen and the observer fires at
     * DOMContentLoaded, before the island's chunk lands), React saw a `style`
     * attribute it never rendered and threw a hydration mismatch. Animating
     * from an effect means the DOM is only touched after hydration is done.
     */
    useEffect(() => {
        const element = accordionRef.current
        if (!element) return

        return inView(
            element,
            () => {
                animate(
                    element.querySelectorAll('.faq-item'),
                    { opacity: [0, 1], y: [20, 0] },
                    {
                        duration: 0.7,
                        type: 'spring',
                        bounce: 0.3,
                        delay: stagger(0.1),
                    }
                )
            },
            { margin: '0px 0px -100px 0px' }
        )
    }, [])

    const toggle = (index: number) =>
        setOpenIndexes((open) => {
            if (open.includes(index)) return open.filter((i) => i !== index)
            return allowMultiple ? [...open, index] : [index]
        })

    return (
        <div className="faq-accordion" ref={accordionRef}>
            {items.map((faq, index) => {
                const isOpen = openIndexes.includes(index)
                const buttonId = `${baseId}-question-${index}`
                const panelId = `${baseId}-answer-${index}`

                return (
                    <div
                        className={'faq-item'.concat(
                            isOpen ? ' faq-item--open' : ''
                        )}
                        key={faq.question}
                    >
                        <h3 className="faq-question">
                            <button
                                type="button"
                                className="faq-trigger"
                                id={buttonId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(index)}
                            >
                                <span className="faq-trigger-text">{faq.question}</span>
                                <svg
                                    className="chevron"
                                    viewBox="0 0 10 6"
                                    width="10"
                                    height="6"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path
                                        d="M1 1l4 4 4-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </h3>
                        {/*
                          * The panel stays in the DOM so its height can animate
                          * (see the 0fr/1fr grid row in the stylesheet), and
                          * `inert` keeps the collapsed copy out of reach of the
                          * keyboard and screen readers while it's hidden.
                          */}
                        <div
                            className="faq-panel"
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            inert={!isOpen}
                        >
                            <div className="faq-panel-inner" >
                                <div className='faq-answer' dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                                {/* <p className="faq-answer">{faq.answer}</p> */}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
