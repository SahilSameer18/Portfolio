import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "!<>-_\\/[]{}—=+*^?#_";

export default function GlitchText({ text, className, style, triggerOnInView = true, active = true }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // Triggers when 10% of the heading is visible, runs only once
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const runGlitch = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    intervalRef.current = setInterval(() => {
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
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }

      iteration += 1 / 3;
    }, 30);
  }, [text]);

  useEffect(() => {
    if (triggerOnInView && isInView && active && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      runGlitch();
    }
  }, [isInView, triggerOnInView, active, runGlitch]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.span
      ref={ref}
      onMouseEnter={runGlitch}
      className={`inline-block ${className || ""}`}
      style={style}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </motion.span>
  );
}
