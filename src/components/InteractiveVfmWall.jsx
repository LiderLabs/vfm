import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "./TextSplitter";

// We extract this into a separate component to satisfy React's Rules of Hooks
const MobileWord = ({ word, scrollYProgress, index, totalWords }) => {
  // Stagger the wave effect diagonally based on the index
  const startProgress = (index / totalWords) * 0.6;
  const endProgress = startProgress + 0.4;

  // As the user scrolls, the word transitions from light grey to navy
  const color = useTransform(
    scrollYProgress, 
    [startProgress, endProgress], 
    ["#4A4A4A", "#001F3F"]
  );

  return (
    <div
      style={{
        position: "absolute",
        top: word.top,
        left: word.left,
        transform: `translate(-50%, -50%) rotate(${word.rotate || "0deg"})`,
        fontSize: word.size,
        fontWeight: word.weight,
        cursor: "default",
        userSelect: "none",
      }}
    >
      <motion.span style={{ color, textShadow: "2px 4px 8px rgba(0,0,0,0.1)", display: "inline-block", whiteSpace: "nowrap" }}>
        {word.text}
      </motion.span>
    </div>
  );
};

export default function InteractiveVfmWall() {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // EXACT SAME LAYOUT DATA (No changes to coordinates)
  const words = [
    { text: "RESOURCE USE", top: "15%", left: "22%", size: "16px", weight: "600" },
    { text: "ACCOUNTABILITY", top: "10%", left: "42%", size: "26px", weight: "900" },
    { text: "LIFECYCLE COST", top: "17%", left: "45%", size: "20px", weight: "600" },
    { text: "GOOD RETURNS", top: "15%", left: "72%", size: "16px", weight: "800", rotate: "90deg" },
    { text: "BENEFIT", top: "22%", left: "85%", size: "24px", weight: "900" },
    { text: "OPTIMISATION", top: "27%", left: "85%", size: "18px", weight: "600" },
    { text: "BEST VALUE", top: "27%", left: "18%", size: "20px", weight: "800" },
    { text: "TRUST", top: "33%", left: "23%", size: "28px", weight: "900" },
    { text: "BUDGET", top: "20%", left: "37%", size: "22px", weight: "900", rotate: "90deg" },
    { text: "COST CONTROL", top: "27%", left: "50%", size: "22px", weight: "800" },
    { text: "COST EFFICIENCY", top: "35%", left: "45%", size: "34px", weight: "900" },
    { text: "VALUE FOR MONEY", top: "46%", left: "50%", size: "72px", weight: "900" },
    { text: "MAXIMUM OUTCOME", top: "59%", left: "50%", size: "42px", weight: "800" },
    { text: "UTILITY", top: "40%", left: "10%", size: "18px", weight: "600" },
    { text: "OUTCOME", top: "46%", left: "9%", size: "18px", weight: "600" },
    { text: "DURABILITY", top: "60%", left: "12%", size: "22px", weight: "800", rotate: "90deg" },
    { text: "EFFICIENCY", top: "60%", left: "93%", size: "22px", weight: "800", rotate: "90deg" },
    { text: "QUALITY ASSURANCE", top: "53%", left: "24%", size: "18px", weight: "600" },
    { text: "STRATEGY", top: "61%", left: "24%", size: "22px", weight: "800" },
    { text: "PLANNING", top: "67%", left: "22%", size: "24px", weight: "800" },
    { text: "LONGEVITY", top: "75%", left: "20%", size: "26px", weight: "900" },
    { text: "SMART CHOICE", top: "72%", left: "40%", size: "16px", weight: "600", rotate: "90deg" },
    { text: "SUSTAINABILITY", top: "68%", left: "50%", size: "22px", weight: "700" },
    { text: "MONITORING", top: "68%", left: "68%", size: "18px", weight: "600" },
    { text: "INNOVATION", top: "68%", left: "82%", size: "18px", weight: "600" },
    { text: "PERFORMANCE", top: "75%", left: "76%", size: "18px", weight: "600" },
    { text: "RETURN ON INVESTMENT", top: "82%", left: "52%", size: "22px", weight: "700" },
    { text: "KNOWLEDGE", top: "90%", left: "52%", size: "26px", weight: "900" },
  ];

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6; 
    const rotateY = ((x / rect.width) - 0.5) * 6;
    setMousePos({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setHoveredWord(null);
    setMousePos({ x: 0, y: 0 }); 
  };

  // THE MAGIC TRICK FOR MOBILE: 
  // We render a fixed-size 1200x675 (16:9) box, and then scale the whole thing down 
  // by 0.35 using CSS transform. This preserves the exact layout without overlaps.
  const mobileScale = 0.35;
  const virtualWidth = 1200;
  const virtualHeight = 675;

  return (
    <section style={{ 
      backgroundColor: "#F8F9FA", 
      padding: isMobile ? "20px 0" : "80px 24px", 
      overflow: "hidden", 
      display: "flex", 
      justifyContent: "center", 
      perspective: "1000px" 
    }}>
      
      <motion.div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          width: isMobile ? "100%" : "100%",
          maxWidth: isMobile ? "100%" : "1200px",
          height: isMobile ? `${virtualHeight * mobileScale}px` : "auto",
          aspectRatio: isMobile ? "none" : "16 / 9",
          backgroundColor: "#FFFFFF",
          borderRadius: isMobile ? "0" : "24px",
          boxShadow: isMobile ? "none" : "inset 0 40px 80px -20px rgba(0,0,0,0.05), 0 30px 60px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        animate={{
          rotateX: isMobile ? 0 : mousePos.x,
          rotateY: isMobile ? 0 : mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        
        {/* The Inner Virtual Canvas */}
        <div style={{
          position: "relative",
          width: isMobile ? `${virtualWidth}px` : "100%",
          height: isMobile ? `${virtualHeight}px` : "100%",
          transform: isMobile ? `scale(${mobileScale})` : "none",
          transformOrigin: "center center",
          flexShrink: 0
        }}>
          
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: "250px",
            background: "radial-gradient(ellipse at top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)",
            zIndex: 0, pointerEvents: "none"
          }} />

          {words.map((word, index) => {
            if (isMobile) {
              return (
                <MobileWord 
                  key={index} 
                  word={word} 
                  scrollYProgress={scrollYProgress} 
                  index={index} 
                  totalWords={words.length} 
                />
              );
            }

            // Desktop Render
            const isHovered = hoveredWord === word.text;
            const isDimmed = hoveredWord !== null && !isHovered;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredWord(word.text)}
                onMouseLeave={() => setHoveredWord(null)}
                style={{
                  position: "absolute",
                  top: word.top,
                  left: word.left,
                  transform: `translate(-50%, -50%) rotate(${word.rotate || "0deg"})`,
                  fontSize: word.size,
                  fontWeight: word.weight,
                  zIndex: isHovered ? 10 : 1,
                  cursor: "crosshair",
                  userSelect: "none",
                  opacity: isDimmed ? 0.2 : 1,
                  transition: "opacity 0.3s ease"
                }}
              >
                <SplitText 
                  text={word.text} 
                  hoveredWord={hoveredWord} 
                  baseColor="#4A4A4A" 
                  hoverColor="#001F3F" 
                  isMobile={false}
                />
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}