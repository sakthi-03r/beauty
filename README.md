# Lakshana Bridal Studio — Premium Website

A luxurious, pixel-perfect bridal studio website for **Lakshana Bridal Studio**, Thiruvennainallur, Tamil Nadu.

## ✨ Features

- **Interactive Hero Animation** — Interactive 192-frame scroll-scrub animation featuring a gorgeous bridal portrait.
- **Custom Lightbox Gallery** — Beautiful 10-image gallery featuring an app-like pop-in animation and full-screen image lightbox viewing.
- **Premium Design** — Elegant serif typography, lavender/purple color palette, gold accents, and custom CSS image filtering.
- **Fully Responsive** — Fluid layouts from 1600px desktop down to 320px ultra-small mobile.
- **Smooth Animations** — AOS scroll animations, hover effects, floating elements, and seamless transitions.
- **Mobile-First UX** — Animated drawer menu, sticky CTA, WhatsApp float, and touch-optimized interactions.
- **Testimonial Carousel** — Swiper.js with autoplay, pagination, and navigation for 5-star reviews.
- **Accessibility** — Semantic HTML5, ARIA labels, keyboard navigation, and focus states.
- **Performance & Optimized** — Deeply optimized DOM, cleaned logic, lazy loading, and minimal footprint.
- **SEO Optimized** — Meta tags, Open Graph, and proper heading hierarchy.

## 🎨 Color Palette

| Color | Hex |
|-------|-----|
| Primary Purple | `#8A5BB8` |
| Dark Purple | `#6B3FA0` |
| Light Lavender | `#F8F2FC` |
| Background | `#FCF8FD` |
| Gold Accent | `#D6B46A` |
| Text Dark | `#3B2D42` |

## 🛠 Tech Stack

- HTML5 (Semantic)
- CSS3 (Custom Properties, Flexbox, Grid, CSS Filters)
- Vanilla JavaScript (ES6+, IntersectionObserver, Canvas API)
- [AOS](https://michalsnik.github.io/aos/) — Animate on Scroll
- [Swiper.js](https://swiperjs.com/) — Touch Carousel
- [Google Fonts](https://fonts.google.com/) — Playfair Display, Cormorant Garamond, Poppins

## 📁 Structure

```text
├── index.html            # Main single-page site
├── api/
│   └── contact.py        # Python Serverless API for form submission
├── assets/
│   ├── css/style.css     # Complete design system
│   ├── js/main.js        # Interactivity, Lightbox, & API fetch logic
│   ├── frame/            # Extracted image frames for the hero animation
│   └── images/           # Bridal images & avatars
├── favicon/              # SVG favicon
├── robots.txt            # Search Engine crawler configuration
├── sitemap.xml           # XML Sitemap for indexing
├── site.webmanifest      # PWA & Mobile manifest
├── vercel.json           # Serverless config & Security headers
└── README.md
```

## 🚀 Getting Started

Simply open `index.html` in a browser. No build step required for the frontend.

For local development with live reload:
```bash
npx live-server
```

## ⚙️ Backend API & Environment Variables

The contact form uses a **Python Serverless API** (`api/contact.py`) to send emails natively via Gmail SMTP, avoiding third-party front-end form services.

If you are hosting on **Vercel** (or similar serverless platforms), you must configure the following Environment Variables in your project settings:

- `SENDER_EMAIL`: The Gmail address used to send the emails (e.g., `your-email@gmail.com`).
- `SENDER_PASSWORD`: An **App Password** generated from your Google Account (Do not use your main login password).

To generate a Google App Password:
1. Go to your Google Account (Security settings).
2. Enable 2-Step Verification.
3. Search for "App Passwords" and create one (Name it "Vercel" or "Website").
4. Copy the generated 16-character code and paste it as the `SENDER_PASSWORD` value in Vercel.

## 🔎 Enterprise SEO & Performance

The website is fully optimized for technical SEO, local search, and performance:
- **Meta & Open Graph:** Comprehensive Open Graph tags (Facebook/WhatsApp), Twitter Cards, and canonical URLs for pristine social sharing.
- **Structured Data (JSON-LD):** Implements `LocalBusiness` and `WebSite` schemas for enhanced Google Rich Results.
- **Performance:** Resources are optimized using `preconnect`, `dns-prefetch`, and `preload`. JavaScript is completely deferred to prevent render-blocking.
- **Image Optimization:** All images include explicit `width`/`height`, `loading="lazy"`, and `decoding="async"` to eliminate Layout Shifts (CLS).
- **Security:** `vercel.json` provides top-tier security headers (`Strict-Transport-Security`, `X-Content-Type-Options`, etc.).

## 📱 Breakpoints

| Device | Width |
|--------|-------|
| Ultra Wide | 1600px |
| Desktop | 1440px, 1366px, 1280px |
| Laptop | 1024px |
| Tablet | 992px, 768px |
| Mobile | 576px, 480px, 390px, 375px, 360px, 320px |

## 📄 License

© 2026 Lakshana Bridal Studio. All Rights Reserved.
