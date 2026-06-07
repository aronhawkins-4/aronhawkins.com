# Aron Hawkins — Personal Site

A fast, static landing page built with [Astro](https://astro.build). Dark, earth-and-terracotta
theme, optimized to convert toward a single call to action: booking a 15-minute intro call.

## Getting started

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build locally
```

Requires Node.js 18.17.1+ (or 20+).

## Project structure

```
src/
  layouts/Layout.astro        # <head>, fonts, global CSS import
  styles/global.css           # the full design system (colors, type, layout)
  components/
    Header.astro              # fixed nav + book-a-call button
    Hero.astro                # headline, CTAs, stats, hero portrait
    Services.astro            # five service cards (from data/services.ts)
    Work.astro                # project cards (from data/projects.ts)
    About.astro               # bio, stack chips, "how I work", about portrait
    CtaBand.astro             # primary conversion band
    Contact.astro             # contact form + email
    Footer.astro              # socials, music, explore links
    Portrait.astro            # reusable "your photo here" placeholder
    Scene.astro               # reusable abstract landscape placeholder
  data/
    services.ts               # edit your services here
    projects.ts               # edit your projects here
  pages/index.astro           # assembles the page + client script
public/
  favicon.svg
```

## Before you launch

1. **Booking link.** In `src/components/CtaBand.astro`, set `BOOKING_URL` to your Calendly or
   Cal.com link. The nav "Book a call" button (in `Header.astro`) points to `#book`, which scrolls
   to this band, so updating it in one place is enough.
2. **Real photos.** Replace the two `<Portrait />` placeholders (hero and about) with real photos.
   The simplest swap is to drop an image into `public/` and replace `<Portrait ... />` with
   `<img src="/your-photo.jpg" alt="Aron Hawkins" class="hero-portrait" />` (keep the
   `hero-portrait` / `about-portrait` class for sizing). A vertical 4:5 photo fits best.
3. **Project thumbnails.** Swap the `<Scene />` placeholders in `Work.astro` for real screenshots
   the same way once you have them.
4. **Contact form.** The form currently does nothing on submit except show a confirmation. Wire it
   to a handler such as Formspree, Resend, or your own endpoint. Update the submit logic in
   `src/pages/index.astro` and the email in `Contact.astro`.

## Editing content

Most copy lives in the data files (`src/data/services.ts`, `src/data/projects.ts`) and directly in
the relevant component. Colors and type are all CSS variables at the top of
`src/styles/global.css`, so retheming is a matter of changing a handful of values.
