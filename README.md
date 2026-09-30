<div align="center">
  <img src="public/portfolio-logo.png" alt="Logo" width="80" height="80" />
  <h1 align="center">Sahil Sameer Siddique | Portfolio</h1>
  <p align="center">
    A high-performance, visually stunning developer portfolio showcasing modern full-stack capabilities. Built with React 19, Vite, Tailwind CSS v4, Three.js, and Framer Motion.
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
  ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
  ![Lenis](https://img.shields.io/badge/Lenis_Scroll-111827?style=for-the-badge&logo=scroll&logoColor=6366f1)

</div>

---

## ✨ Features & Highlights

- **Bento Grid & Glassmorphism:** Sleek, modern UI utilizing custom radial backdrops, fine dot-grid overlays, and asymmetric bento-box layouts.
- **Interactive 3D Elements & Hero Scene:** Three.js particle canvas via React Three Fiber/Drei paired with hardware-accelerated 3D card tilt calculated with `requestAnimationFrame`.
- **Interactive API Console (`ApiConsole`):** Built-in REST API simulator allowing visitors to inspect mock request payloads, status headers, and syntax-highlighted JSON responses for featured projects.
- **Architecture Spec Viewer:** Interactive component for visualizing system architectures, database models, and backend workflows.
- **Interactive Terminal Shell:** Command-line contact interface that accepts interactive shell commands (e.g., `contact --list`, `email`, `github`, `clear`).
- **Smooth Momentum Scrolling:** Integrated **Lenis** smooth scroll engine for silky 60fps momentum across all desktop and mobile devices.
- **Dynamic Themes:** Smooth transition system between dark and light mode with pre-render anti-flash protection and contrast-tuned accent palettes.
- **Performance-First Animations:** Spring physics, magnetic buttons, custom cursor tracking, and complete `prefers-reduced-motion` accessibility support.

---

## 🛠️ Architecture & Tech Stack

```text
src/
├── assets/              # Static media, icons, and optimized WebP images
├── components/          # Reusable UI & interactive widgets
│   ├── ApiConsole.jsx               # In-browser REST API simulator
│   ├── ArchitectureSpecViewer.jsx   # Technical architecture model viewer
│   ├── Cursor.jsx                   # Custom smooth-follow cursor
│   ├── GlitchText.jsx               # Cyberpunk glitch typography effect
│   ├── HeroScene.jsx                # Three.js Fiber background scene
│   ├── Magnetic.jsx                 # Spring physics magnetic button wrapper
│   ├── Navbar.jsx                   # Floating glassmorphic navbar with scroll observer
│   ├── Preloader.jsx                # First-session branded intro sequence
│   ├── ScrollProgress.jsx           # Global reading progress indicator
│   ├── SmoothScroll.jsx             # Lenis smooth-scroll provider
│   ├── SoftBackdrop.jsx             # Radial gradient backdrop canvas
│   └── ThemeToggle.jsx              # Circular view-transition theme switch
├── constants/           # Centralized static data (skills, projects, hero data)
├── context/             # ThemeContext for global dark/light state
├── hooks/               # Custom helper hooks (useReducedMotion, countUp, etc.)
├── sections/            # Major page sections (Hero, About, Skills, Projects, Education, Contact, Footer)
└── App.jsx              # Application root with React.lazy() code splitting & Suspense fallbacks
```

### Core Technologies
- **Frontend Core:** React 19 & Vite 7 (optimized production build with manual chunk splitting)
- **Styling:** Pure Tailwind CSS v4 & custom HSL/CSS design tokens
- **3D & Canvas:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation & Motion:** Framer Motion 12
- **Smooth Scroll:** Lenis (`lenis: ^1.3.25`)
- **Icons:** React Icons (`react-icons`)

---

## 🚀 Installation & Setup

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/SahilSameer18/Portfolio.git
# or via SSH:
# git clone git@github.com:SahilSameer18/Portfolio.git

cd Portfolio

# Install dependencies (using pnpm or npm)
pnpm install
# or: npm install

# Run the development server
pnpm dev
# or: npm run dev
```

### Available Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` / `npm run dev` | Starts Vite development server with Hot Module Replacement (HMR). |
| `pnpm build` / `npm run build` | Compiles an optimized production bundle into the `/dist` folder. |
| `pnpm lint` / `npm run lint` | Runs ESLint syntax and code quality checks. |
| `pnpm preview` / `npm run preview` | Locally serves the built production bundle for testing. |

---

## ⚡ Performance Optimizations

- **Dynamic Code Splitting:** `React.lazy()` and `<Suspense>` are used in `App.jsx` to load off-screen sections (Projects, Skills, Education, Contact) on demand.
- **Layout Stability:** Reserved dimensions across 3D canvases and bento cards prevent Cumulative Layout Shift (CLS).
- **Optimized Event Listeners:** Mouse tracking for 3D tilt and custom cursor bypasses React's state cycle, directly updating the DOM via `requestAnimationFrame`.
- **Session Memory:** The branded intro preloader stores session state in `sessionStorage` (`preloaderShown`) to avoid repeating the intro on internal refreshes.

---

## 📧 Let's Connect

- **LinkedIn:** [sahil-sameer-siddique](https://www.linkedin.com/in/sahil-sameer-siddique/)
- **GitHub:** [@SahilSameer18](https://github.com/SahilSameer18)
- **Email:** [sahilsameer.dev18@gmail.com](mailto:sahilsameer.dev18@gmail.com)

---

<p align="center">
  <i>Developed with precision and passion by Sahil Sameer Siddique</i>
</p>

