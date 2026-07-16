import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "!<>-_\\/[]{}—=+*^?#_";

export default function GlitchText({ text, className, style, triggerOnInView = true }) {
  const [displayText, setDisplayText] = useState(text);
  const [triggerGlitch, setTriggerGlitch] = useState(false);
  const ref = useRef(null);
  
  // Triggers when 10% of the heading is visible, runs only once
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (triggerOnInView && isInView) {
      setTriggerGlitch(true);
    }
  }, [isInView, triggerOnInView]);

  useEffect(() => {
    if (!triggerGlitch) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setTriggerGlitch(false);
      }
      
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [triggerGlitch, text]);

  return (
    <motion.span
      ref={ref}
      onMouseEnter={() => setTriggerGlitch(true)}
      className={`inline-block ${className || ""}`}
      style={style}
    >
      {displayText}
    </motion.span>
  );
}
