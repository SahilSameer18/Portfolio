<div align="center">
  <img src="public/portfolio-logo.png" alt="Logo" width="80" height="80" />
  <h1 align="center">Sahil Sameer Siddique | Portfolio</h1>
  <p align="center">
    A high-performance, visually stunning developer portfolio showcasing full-stack capabilities. Built with React 19, Vite, and Tailwind CSS v4.
    <br />
    <br />
    <a href="https://sahil-sameer-portfolio.vercel.app/"><strong>View Live Site »</strong></a>
    ·
    <a href="https://github.com/SahilSameer18/Portfolio/issues">Report Bug</a>
  </p>
</div>

<div align="center">
  
  ![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite_7-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

</div>

---

## ✨ Features & Highlights

- **Bento Grid & Glassmorphism:** Sleek, modern UI utilizing custom radial backdrops, fine dot-grid overlays, and asymmetric bento-box layouts.
- **Interactive 3D Elements:** Hardware-accelerated 3D card tilt effects calculating raw mouse coordinates via `requestAnimationFrame` to prevent React render chattering.
- **Performance-First Animations:** 100% GPU-composited scroll progress indicators, interactive custom cursors, and magnetic buttons built with Framer Motion.
- **Dynamic Themes:** Smooth transition system between dark and light mode with pre-render anti-flash protection.
- **Interactive Terminal Shell:** A functional, command-line inspired contact section that accepts user commands (e.g., `email`, `github`, `clear`).
- **Flawless SEO & Accessibility:** Semantic HTML, JSON-LD Structured Schema (Person), XML Sitemap, canonical tags, and `useReducedMotion` support.

---

## 🛠️ Architecture & Tech Stack

The architecture separates data logic from visual components for maximum scalability.

- **Core Framework:** React 19 & Vite (optimized production build with manual chunk splitting)
- **Styling:** Tailwind CSS v4 & custom CSS variables
- **Animations:** Framer Motion 12
- **Icons:** React Icons

```text
src/
├── assets/              # Static images and media
├── components/          # Global UI elements (Navbar, ThemeToggle, SoftBackdrop)
├── constants/           # Centralized static data (skills, projects, education)
├── context/             # ThemeContext for global dark/light state
├── hooks/               # Custom helper hooks (useCountUp, etc.)
├── sections/            # Visual layout components (Hero, About, Skills, Projects, etc.)
└── App.jsx              # Main entry point with React.lazy() code splitting
```

---

## 🚀 Installation & Setup

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/SahilSameer18/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Available Commands
- `npm run dev` — Starts Vite dev server with hot module replacement (HMR).
- `npm run build` — Compiles optimized production bundle to the `/dist` folder.
- `npm run lint` — Runs ESLint for syntax and lint validation.
- `npm run preview` — Locally previews the production build.

---

## ⚡ Performance Optimizations

This portfolio was engineered to be fast, despite the heavy animations.
- **Dynamic Code Splitting:** `React.lazy()` and `<Suspense>` are used in `App.jsx` to load off-screen sections (Projects, Contact) on demand.
- **Layout Stability:** Zero Cumulative Layout Shifts (CLS) achieved through strict aspect-ratio sizing on graphics and bento grids.
- **Optimized Event Listeners:** Mouse tracking for the 3D tilt and cursor bypasses React's state cycle, directly updating the DOM via `requestAnimationFrame`.

---

## 📧 Let's Connect

- **LinkedIn:** [sahil-sameer-siddique](https://www.linkedin.com/in/sahil-sameer-siddique/)
- **GitHub:** [@SahilSameer18](https://github.com/SahilSameer18)
- **Email:** [sahilsameer.dev18@gmail.com](mailto:sahilsameer.dev18@gmail.com)

---
<p align="center">
  <i>Developed with precision and passion by Sahil Sameer Siddique</i>
</p>

