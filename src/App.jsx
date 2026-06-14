import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import SoftBackdrop from "./components/SoftBackdrop";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Project from "./sections/Project";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Experience from "./sections/Experience";

function App() {
  return (
    <>
      <SoftBackdrop />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      {/* <Experience /> */}
      <Project />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

export default App;


