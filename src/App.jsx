import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import SoftBackdrop from "./components/SoftBackdrop";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";

const About     = lazy(() => import("./sections/About"));
// const Experience = lazy(() => import("./sections/Experience"));
const Skills    = lazy(() => import("./sections/Skills"));
const Project   = lazy(() => import("./sections/Project"));
const Education = lazy(() => import("./sections/Education"));
const Contact   = lazy(() => import("./sections/Contact"));
const Footer    = lazy(() => import("./sections/Footer"));

function SectionFallback() {
  return <div className="min-h-[20vh]" aria-hidden="true" />;
}

function App() {
  // Show preloader only once per browser session
  const [showPreloader, setShowPreloader] = useState(
    () => !sessionStorage.getItem("preloaderShown"),
  );

  return (
    <SmoothScroll>
      {/* ── Branded intro animation — fades out before site is visible ── */}
      <AnimatePresence>
        {showPreloader && (
          <Preloader
            onComplete={() => {
              sessionStorage.setItem("preloaderShown", "true");
              setShowPreloader(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Global UI overlays */}
      <ScrollProgress />
      <Cursor />

      <SoftBackdrop />
      <Navbar />
      <Hero startAnimation={!showPreloader} />

      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      {/* <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense> */}
      <Suspense fallback={<SectionFallback />}>
        <Project />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Education />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </SmoothScroll>
  );
}

export default App;
