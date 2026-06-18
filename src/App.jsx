import { lazy, Suspense } from "react";
import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import SoftBackdrop from "./components/SoftBackdrop";

const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
// const Experience = lazy(() => import("./sections/Experience"));
const Project = lazy(() => import("./sections/Project"));
const Education = lazy(() => import("./sections/Education"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

function SectionFallback() {
  return <div className="min-h-[20vh]" aria-hidden="true" />;
}

function App() {
  return (
    <>
      <SoftBackdrop />
      <Navbar />
      <Hero />
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
    </>
  );
}

export default App;
