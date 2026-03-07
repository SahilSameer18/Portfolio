import { FaLinkedin, FaGithub, FaInstagram, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* All content in one line */}
        <div className="flex flex-wrap items-center justify-center md:justify-between w-full gap-6">
          {/* Social Icons */}
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/sahil-sameer-siddique-abb849233/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition duration-500 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_#0077B5]"
            >
              <FaLinkedin className="text-[#0077B5] text-xl" />
            </a>
            <a
              href="https://github.com/SahilSameer18"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition duration-500 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_#ffffff]"
            >
              <FaGithub className="text-white text-xl" />
            </a>
            <a
              href="https://instagram.com/yourinstagram"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition duration-500 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_#E1306C]"
            >
              <FaInstagram className="text-[#E1306C] text-xl" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-white/50 text-sm whitespace-nowrap">
            © {new Date().getFullYear()} Sahil Sameer Siddique. All rights reserved.
          </div>

          {/* Back to Top */}
          <a
            href="#top"
            className="flex items-center gap-2 text-white/80 hover:text-indigo-500 transition duration-500 transform hover:-translate-y-1 hover:scale-110 text-sm whitespace-nowrap"
          >
            <FaArrowUp className="animate-bounce-slow" /> Back to top
          </a>
        </div>
      </div>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-in-out;
        }
      `}</style>
    </footer>
  );
}