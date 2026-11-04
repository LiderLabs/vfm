import { motion } from "framer-motion";

export default function SplitText({ text, hoveredWord, baseColor, hoverColor }) {
  const words = text.split(" ");

  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, charIndex) => {
            
            const isWordHovered = hoveredWord === text;

            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 1, z: 0, y: 0, color: baseColor, textShadow: "2px 4px 8px rgba(0,0,0,0.1)" }}
                animate={
                  isWordHovered
                    ? { 
                        z: 50, 
                        y: -5, 
                        color: hoverColor, 
                        textShadow: "0 20px 30px rgba(0, 31, 63, 0.3)" 
                      }
                    : { 
                        z: 0, 
                        y: 0, 
                        color: baseColor, 
                        textShadow: "2px 4px 8px rgba(0,0,0,0.1)" 
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: isWordHovered ? charIndex * 0.02 : 0, 
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}></span>
        </span>
      ))}
    </span>
  );
}