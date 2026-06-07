import { FaLinkedin, FaGithub, FaInstagram, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center md:justify-between w-full gap-6">
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/sahil-sameer-siddique/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition duration-300 hover:scale-110"
            >
              <FaLinkedin className="text-[#0077B5] text-xl" />
            </a>
            <a
              href="https://github.com/SahilSameer18"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition duration-300 hover:scale-110"
            >
              <FaGithub className="text-white text-xl" />
            </a>
            <a
              href="https://instagram.com/yourinstagram"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition duration-300 hover:scale-110"
            >
              <FaInstagram className="text-[#E1306C] text-xl" />
            </a>
          </div>

          <div className="text-white/50 text-sm whitespace-nowrap">
            © {new Date().getFullYear()} Sahil Sameer Siddique. All rights reserved.
          </div>

          <a
            href="#home"
            className="flex items-center gap-2 text-white/80 hover:text-indigo-400 transition duration-300 text-sm whitespace-nowrap"
          >
            <FaArrowUp /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
