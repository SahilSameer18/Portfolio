import Header from "./pages/Header";
import "./App.css";
import Navbar from "./components/Navbar";
import SoftBackdrop from "./components/SoftBackdrop";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Project from "./pages/Project";
import Education from "./pages/Education"
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";

function App() {
  return (
    <>
      <SoftBackdrop />
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Project />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
