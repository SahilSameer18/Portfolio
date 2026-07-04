import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
};

/**
 * AnimatedHeading — reveals an <h2> word-by-word on scroll.
 *
 * @param {string}  text      Text content (split on spaces into words)
 * @param {string}  className className forwarded to the <h2>
 * @param {object}  style     Inline styles (gradient text, etc.)
 * @param {boolean} center    Horizontally centers words (use for centered sections)
 */
export default function AnimatedHeading({ text, className, style, center = false }) {
  const words = text.split(" ");

  return (
    <motion.h2
      className={className}
      style={{
        ...style,
        display: "flex",
        flexWrap: "wrap",
        gap: "0.28em",
        justifyContent: center ? "center" : "flex-start",
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {words.map((word, i) => (
        /* overflow-hidden clips the word during its upward travel */
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
        >
          <motion.span className="inline-block" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
