# 🚀 Sahil Sameer Siddique | Portfolio

A high-performance, modern developer portfolio showcasing full-stack capabilities, built with React 19, Vite, and Tailwind CSS v4.

🔗 **Live Site:** [sahil-sameer-portfolio.vercel.app](https://sahil-sameer-portfolio.vercel.app/)

---

## ✨ Features

- **Performance-First Animations:** 100% GPU-composited scroll progress indicators and cursor followers built using Framer Motion.
- **Dynamic Themes:** Smooth transition system between dark and light mode with pre-render anti-flash protection.
- **Glassmorphic Design:** Sleek UI utilizing custom radial backdrops and fine dot-grid overlays.
- **Responsive Navigation:** Scroll-spy pill navbar for desktop and standard mobile drawer navigation.

---

## 🛠️ Architecture & Tech Stack

- **Core Framework:** React 19 & Vite 7 (optimized production build with manual chunk splitting)
- **Styling:** Tailwind CSS v4 & custom HSL/RGB CSS variables
- **Animations:** Framer Motion 12
- **SEO & Search Engines:** Semantic HTML, JSON-LD Structured Schema, XML Sitemap, and SEO meta tags

```text
src/
├── components/          # Global UI elements (Navbar, ThemeToggle, SoftBackdrop)
├── context/             # ThemeContext for global dark/light state
├── sections/            # Visual layout components (Hero, About, Experience, Skills, Projects, etc.)
└── hooks/               # Custom helper hooks (useCountUp)
```

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/SahilSameer18/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

### Available Commands
- `npm run dev` — Starts Vite dev server.
- `npm run build` — Compiles optimized production bundle to `/dist`.
- `npm run lint` — Runs ESLint for syntax/lint validation.

---

## ⚡ Performance & Optimization

- **Dynamic Code Splitting:** Heavy modules (framer-motion, react-icons) split to reduce initial footprint.
- **Layout Stability:** Zero layout shifts (CLS) achieved through aspect-ratio sizing on graphics.
- **Zero Render Chattering:** Mouse coordinates are updated directly via Framer Motion's React-bypass hooks.
- **Anti-Flash Theme:** Custom blocking scripts applied in DOM to avoid dark-theme flashing.
- **Lazy Component Loading:** Dynamically loads off-screen sections (About, Skills) on demand.

---

## 📧 Let's Connect

- **LinkedIn:** [sahil-sameer-siddique](https://www.linkedin.com/in/sahil-sameer-siddique/)
- **GitHub:** [@SahilSameer18](https://github.com/SahilSameer18)
- **Email:** [sahilsameer.dev18@gmail.com](mailto:sahilsameer.dev18@gmail.com)

---
*Developed with care by Sahil Sameer Siddique*
