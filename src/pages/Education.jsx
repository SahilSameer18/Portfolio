import { useEffect, useRef } from "react";
import { FaGraduationCap } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const educationData = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      duration: "2021 – 2025",
      institution: "International Institute of Technology and Management, Sonipat",
    },
    {
      degree: "Senior Secondary",
      duration: "2018 – 2020",
      institution: "Dr Zakir Hussain High School, Patna",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate big background text
      gsap.fromTo(
        ".bg-education-text",
        { opacity: 0, y: -40 },
        {
          opacity: 0.12,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate each timeline item
      itemsRef.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative text-white py-20 md:py-28 overflow-hidden"
    >

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold">Education</h2>
          <p className="text-xs tracking-widest text-white/60 mt-2">
            ACADEMIC MILESTONES
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          {/* <div className="absolute left-1/2 top-0 w-px h-full bg-white/30 -translate-x-1/2"></div> */}

          {educationData.map((edu, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative flex flex-col items-center text-center mb-16"
            >
              {/* Icon */}
              <div className="bg-black z-10 p-3 rounded-full border border-white/30">
                <FaGraduationCap className="text-white text-2xl" />
              </div>

              {/* Text */}
              <div className=" px-4 mt-4">
                <h3 className="text-xl md:text-2xl font-semibold">{edu.degree}</h3>
                <p className="text-sm md:text-lg text-white/60">{edu.duration}</p>
                <p className="text-sm md:text-lg text-white/50 mt-1">{edu.institution}</p>
              </div>

              {/* Connector line */}
              {/* {index !== educationData.length - 1 && (
                <div className="w-px h-14 bg-white/30 mt-4"></div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}