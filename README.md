# 🚀 Sahil Sameer Siddique - Portfolio Website

A modern, responsive, and animated portfolio website built with React and cutting-edge web technologies. Showcasing projects, skills, and experience with smooth animations and a sleek design.

## 📸 Preview

The portfolio features:

- **Hero Section** - Animated introduction with profile photo and dynamic title rotation
- **About** - Personal background and professional overview
- **Skills** - Technical expertise and proficiency levels
- **Projects** - Showcase of completed projects and work samples
- **Education** - Academic background and qualifications
- **Contact** - Get in touch section for collaboration opportunities
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.2.1
- **Animations**:
  - Framer Motion 12.35.0 (React animations)
  - GSAP 3.14.2 (advanced animations)
- **Icons**: React Icons 5.6.0
- **Code Quality**: ESLint 9.39.1
- **Development Server**: Vite Dev Server

## 📦 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   └── SoftBackdrop.jsx    # Background effect component
│   ├── pages/
│   │   ├── Hero.jsx            # Hero/intro section
│   │   ├── About.jsx           # About section
│   │   ├── Skills.jsx          # Skills section
│   │   ├── Project.jsx         # Projects showcase
│   │   ├── Education.jsx       # Education section
│   │   ├── Contact.jsx         # Contact section
│   │   └── Footer.jsx          # Footer component
│   ├── assets/                 # Images and media files
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   ├── index.css               # Global styles
│   └── App.css                 # App-specific styles
├── public/                     # Static assets
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:5173`

## 📝 Available Scripts

- **`npm run dev`** - Start development server with hot module replacement
- **`npm run build`** - Create optimized production build
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🎨 Features

✨ **Smooth Animations**

- Framer Motion for component animations and transitions
- GSAP for advanced motion graphics
- Smooth scroll experience

📱 **Responsive Design**

- Mobile-first approach
- Tailwind CSS for responsive utilities
- Optimized for all screen sizes

🎯 **Modern UI**

- Clean and professional design
- Gradient effects and smooth transitions
- Dark theme with accent colors

⚡ **Performance**

- Vite for fast build times and instant HMR
- Optimized bundle size
- Fast development experience

## 🔧 Customization

### Changing Content

- **Hero Section**: Edit `src/pages/Hero.jsx` to update name, titles, and resume link
- **About Section**: Modify `src/pages/About.jsx` for personal information
- **Skills**: Update `src/pages/Skills.jsx` with your technical skills
- **Projects**: Add your projects in `src/pages/Project.jsx`
- **Education**: Update `src/pages/Education.jsx` with academic details
- **Contact**: Customize `src/pages/Contact.jsx` with contact information

### Styling

- **Colors & Theme**: Modify Tailwind CSS utilities in components
- **Fonts & Typography**: Update in `src/index.css`
- **Component Styles**: Edit individual CSS files in `src/`

### Adding Images

- Place images in `src/assets/`
- Update import paths in components as needed
- Ensure images are optimized for web

## 🔗 Deployment

The portfolio is ready to deploy to any static hosting platform:

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

### GitHub Pages

Update `vite.config.js` with your repository name and run `npm run build`

## 📧 Contact & Social

Connect with me for collaboration opportunities:

- **Email**: [Your email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]


## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animations powered by [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons)
- Dev tooling by [Vite](https://vite.dev)

---

**Made with ❤️ by Sahil Sameer Siddique**