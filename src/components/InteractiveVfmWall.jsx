import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import SplitText from "./TextSplitter";

export default function InteractiveVfmWall() {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [autoWord, setAutoWord] = useState(null);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [windowWidth, setWindowWidth] = useState(1200);

  // Drag repulsion state
  const [dragState, setDragState] = useState({
    activeWord: null,
    x: 0,
    y: 0,
  });

  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  // Mouse physics motion values for 3D card tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // Scroll assembly
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const scrollAssemble = useSpring(scrollYProgress, { damping: 24, stiffness: 100 });

  // FIX: Hook is now at the top level so it doesn't crash on mobile
  const glareBackground = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) =>
      `radial-gradient(480px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0, 31, 63, 0.04), transparent 70%)`
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Idle mobile breathing
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction < 2500) return;
      const randomIndex = Math.floor(Math.random() * words.length);
      setAutoWord(words[randomIndex].text);
      setTimeout(() => setAutoWord(null), 1200);
    }, 1800);
    return () => clearInterval(interval);
  }, [isMobile, lastInteraction]);

  const virtualWidth = 1200;
  const virtualHeight = 720;
  const dynamicMobileScale = Math.min((windowWidth - 32) / virtualWidth, 0.45);
  const currentScale = isMobile ? dynamicMobileScale : 1;

  // ALL 36 WORDS
  const rawWords = [
    { text: "ACCOUNTABILITY", top: "26%", left: "41.5%", size: "26px", weight: "900", depth: 25, color: "#2563EB", scatter: { x: -20, y: -70, z: 80, r: -4 } },
    { text: "LIFECYCLE COST", top: "30.5%", left: "41.5%", size: "20px", weight: "600", depth: 15, color: "#059669", scatter: { x: 10, y: -60, z: 50, r: 3 } },
    { text: "COST CONTROL", top: "34.5%", left: "45%", size: "22px", weight: "800", depth: 20, color: "#D97706", scatter: { x: 20, y: -40, z: 60, r: 4 } },
    { text: "COST EFFICIENCY", top: "39.5%", left: "43.5%", size: "34px", weight: "900", depth: 35, color: "#7C3AED", scatter: { x: 0, y: -30, z: 110, r: -2 } },
    { text: "RESOURCE USE", top: "31%", left: "21.5%", size: "16px", weight: "600", depth: 16, color: "#0284C7", scatter: { x: -70, y: -50, z: 70, r: -8 } },
    { text: "BEST VALUE", top: "34.5%", left: "21.5%", size: "18px", weight: "800", depth: 20, color: "#EA580C", scatter: { x: -60, y: -30, z: 60, r: 6 } },
    { text: "TRUST", top: "39%", left: "23%", size: "28px", weight: "900", depth: 30, color: "#E11D48", scatter: { x: -60, y: 0, z: 90, r: -8 } },
    { text: "BUDGET", top: "32%", left: "28.5%", size: "22px", weight: "900", rotate: "90deg", depth: 28, color: "#0D9488", scatter: { x: -40, y: -40, z: 80, r: 20 } },
    { text: "GOOD RETURNS", top: "17%", left: "57.5%", size: "15px", weight: "800", rotate: "90deg", depth: 22, color: "#16A34A", scatter: { x: 50, y: -60, z: 70, r: 30 } },
    { text: "BENEFIT", top: "32%", left: "57.5%", size: "19px", weight: "900", rotate: "90deg", depth: 28, color: "#C026D3", scatter: { x: 60, y: -50, z: 80, r: 25 } },
    { text: "SMART SPENDING", top: "27%", left: "61%", size: "17px", weight: "800", rotate: "90deg", depth: 25, color: "#4F46E5", scatter: { x: 70, y: -50, z: 80, r: 20 } },
    { text: "ECONOMY", top: "32.6%", left: "67.5%", size: "20px", weight: "800", depth: 22, color: "#CA8A04", scatter: { x: 80, y: -40, z: 70, r: -6 } },
    { text: "PERFORMANCE", top: "38.2%", left: "68%", size: "19px", weight: "800", depth: 24, color: "#DC2626", scatter: { x: 80, y: -20, z: 70, r: 5 } },
    { text: "INVESTMENT", top: "26%", left: "77%", size: "22px", weight: "900", rotate: "90deg", depth: 32, color: "#0284C7", scatter: { x: 70, y: -30, z: 120, r: 35 } },
    { text: "SAVINGS", top: "47%", left: "81.5%", size: "18px", weight: "900", rotate: "90deg", depth: 28, color: "#059669", scatter: { x: 80, y: 30, z: 90, r: -25 } },
    { text: "NO WASTE", top: "47%", left: "84.5%", size: "18px", weight: "800", rotate: "90deg", depth: 28, color: "#059669", scatter: { x: 90, y: 30, z: 90, r: -25 } },
    { text: "VALUE FOR MONEY", top: "47.5%", left: "48%", size: "72px", weight: "900", depth: 40, color: "#1D4ED8", scatter: { x: 0, y: 0, z: 140, r: 0 } },
    { text: "MAXIMUM OUTPUT", top: "57%", left: "47.5%", size: "40px", weight: "900", depth: 34, color: "#7C3AED", scatter: { x: 0, y: 40, z: 100, r: 2 } },
    { text: "COST BENEFIT", top: "57%", left: "72%", size: "26px", weight: "800", depth: 26, color: "#DC2626", scatter: { x: 70, y: 40, z: 80, r: -4 } },
    { text: "UTILITY", top: "43.5%", left: "14.5%", size: "18px", weight: "600", depth: 15, color: "#0891B2", scatter: { x: -80, y: -10, z: 50, r: 10 } },
    { text: "OUTCOME", top: "48.5%", left: "14.5%", size: "18px", weight: "600", depth: 18, color: "#9333EA", scatter: { x: -80, y: 15, z: 60, r: -6 } },
    { text: "DURABILITY", top: "65%", left: "10%", size: "22px", weight: "800", rotate: "90deg", depth: 26, color: "#B45309", scatter: { x: -70, y: 50, z: 80, r: 35 } },
    { text: "QUALITY ASSET", top: "55%", left: "20.5%", size: "16px", weight: "700", depth: 18, color: "#059669", scatter: { x: -40, y: 25, z: 50, r: -4 } },
    { text: "STRATEGY", top: "58.5%", left: "19%", size: "20px", weight: "800", depth: 24, color: "#E11D48", scatter: { x: -50, y: 50, z: 70, r: 6 } },
    { text: "PLANNING", top: "62.5%", left: "19%", size: "20px", weight: "800", depth: 24, color: "#2563EB", scatter: { x: -60, y: 70, z: 80, r: -5 } },
    { text: "LONGEVITY", top: "66.5%", left: "19.5%", size: "24px", weight: "900", depth: 28, color: "#D97706", scatter: { x: -50, y: 90, z: 90, r: 8 } },
    { text: "OPTIMIZATION", top: "62.5%", left: "26%", size: "14px", weight: "700", rotate: "90deg", depth: 22, color: "#0284C7", scatter: { x: -30, y: 70, z: 70, r: 30 } },
    { text: "WISE CHOICE", top: "62.5%", left: "28%", size: "14px", weight: "700", rotate: "90deg", depth: 22, color: "#7C3AED", scatter: { x: -20, y: 70, z: 70, r: 30 } },
    { text: "RELIABILITY", top: "62.5%", left: "30%", size: "14px", weight: "700", rotate: "90deg", depth: 22, color: "#16A34A", scatter: { x: -10, y: 70, z: 70, r: 30 } },
    { text: "SMART CHOICE", top: "69.5%", left: "34%", size: "16px", weight: "700", rotate: "90deg", depth: 20, color: "#EA580C", scatter: { x: -10, y: 70, z: 60, r: 25 } },
    { text: "SUSTAINABILITY", top: "62.5%", left: "44%", size: "22px", weight: "800", depth: 25, color: "#059669", scatter: { x: 10, y: 50, z: 70, r: -3 } },
    { text: "MONITORING", top: "62.5%", left: "58.5%", size: "19px", weight: "700", depth: 18, color: "#0284C7", scatter: { x: 50, y: 50, z: 50, r: 5 } },
    { text: "STANDARD", top: "71%", left: "66.5%", size: "18px", weight: "800", rotate: "90deg", depth: 24, color: "#4F46E5", scatter: { x: 60, y: 70, z: 70, r: 30 } },
    { text: "PRODUCTIVITY", top: "62.5%", left: "75%", size: "20px", weight: "800", depth: 24, color: "#D97706", scatter: { x: 80, y: 50, z: 70, r: -5 } },
    { text: "RETURN ON INVESTMENT", top: "66.5%", left: "49.5%", size: "22px", weight: "800", depth: 28, color: "#E11D48", scatter: { x: 10, y: 80, z: 90, r: -3 } },
    { text: "KNOWLEDGE", top: "71%", left: "49.5%", size: "26px", weight: "900", depth: 32, color: "#7C3AED", scatter: { x: 10, y: 110, z: 100, r: 4 } },
  ];

  const words = useMemo(() => {
    return rawWords.map((w) => ({
      ...w,
      canvasX: (parseFloat(w.left) / 100) * virtualWidth,
      canvasY: (parseFloat(w.top) / 100) * virtualHeight,
    }));
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current || dragState.activeWord) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredWord(null);
  };

  const handleWordDrag = (word, info) => {
    if (!info || !info.offset) return;
    setLastInteraction(Date.now());
    setDragState({
      activeWord: word.text,
      x: word.canvasX + info.offset.x / currentScale,
      y: word.canvasY + info.offset.y / currentScale,
    });
  };

  const handleWordDragEnd = () => {
    setDragState({ activeWord: null, x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#F8F9FA",
        padding: isMobile ? "20px 0" : "80px 24px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: "1200px",
      }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          width: isMobile ? `${virtualWidth * dynamicMobileScale}px` : "1200px",
          height: isMobile ? `${virtualHeight * dynamicMobileScale}px` : `${virtualHeight}px`,
          backgroundColor: "#FFFFFF",
          borderRadius: isMobile ? "12px" : "28px",
          boxShadow: isMobile
            ? "none"
            : "inset 0 40px 80px -20px rgba(0,0,0,0.03), 0 35px 70px -15px rgba(0,0,0,0.08)",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isMobile || dragState.activeWord ? 0 : rotateX.get(),
          rotateY: isMobile || dragState.activeWord ? 0 : rotateY.get(),
        }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
      >
        {!isMobile && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: glareBackground,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            width: `${virtualWidth}px`,
            height: `${virtualHeight}px`,
            transform: isMobile ? `scale(${dynamicMobileScale})` : "none",
            transformOrigin: "top left",
            transformStyle: "preserve-3d",
          }}
        >
          {words.map((word, index) => {
            const isHovered = hoveredWord === word.text;
            const isAuto = autoWord === word.text;
            const isBeingDragged = dragState.activeWord === word.text;
            const isActive = isHovered || isAuto || isBeingDragged;
            const isDimmed =
              (hoveredWord !== null || autoWord !== null || dragState.activeWord !== null) &&
              !isActive;

            let repelX = 0;
            let repelY = 0;
            if (dragState.activeWord && !isBeingDragged) {
              const dx = word.canvasX - dragState.x;
              const dy = word.canvasY - dragState.y;
              const dist = Math.hypot(dx, dy);
              const partRadius = 135;

              if (dist < partRadius && dist > 0) {
                const force = (1 - dist / partRadius) * 55;
                repelX = (dx / dist) * force;
                repelY = (dy / dist) * force;
              }
            }

            return (
              <WordItem
                key={index}
                word={word}
                isActive={isActive}
                isDimmed={isDimmed}
                isBeingDragged={isBeingDragged}
                repelX={repelX}
                repelY={repelY}
                isMobile={isMobile}
                scrollAssemble={scrollAssemble}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
                onSelect={() => {
                  setHoveredWord(word.text);
                  setLastInteraction(Date.now());
                }}
                onDeselect={() => setHoveredWord(null)}
                onDrag={(info) => handleWordDrag(word, info)}
                onDragEnd={handleWordDragEnd}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function WordItem({
  word,
  isActive,
  isDimmed,
  isBeingDragged,
  repelX,
  repelY,
  isMobile,
  scrollAssemble,
  smoothMouseX,
  smoothMouseY,
  onSelect,
  onDeselect,
  onDrag,
  onDragEnd,
}) {
  const scatterX = useTransform(scrollAssemble, [0, 1], [word.scatter.x, 0]);
  const scatterY = useTransform(scrollAssemble, [0, 1], [word.scatter.y, 0]);
  const scatterZ = useTransform(scrollAssemble, [0, 1], [word.scatter.z, word.depth]);
  const scatterRotate = useTransform(scrollAssemble, [0, 1], [word.scatter.r, 0]);
  const scrollOpacity = useTransform(scrollAssemble, [0, 0.4, 1], [0, 0.6, 1]);

  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-word.depth * 0.4, word.depth * 0.4]);
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-word.depth * 0.4, word.depth * 0.4]);

  const baseX = useTransform([scatterX, parallaxX], ([s, p]) => (isMobile ? 0 : s + p));
  const baseY = useTransform([scatterY, parallaxY], ([s, p]) => (isMobile ? 0 : s + p));
  const wordRotate = useTransform(scatterRotate, (r) =>
    isMobile ? word.rotate || "0deg" : `${r + (parseInt(word.rotate) || 0)}deg`
  );

  return (
    <div
      style={{
        position: "absolute",
        top: word.top,
        left: word.left,
        transform: "translate(-50%, -50%)",
        transformStyle: "preserve-3d",
        zIndex: isBeingDragged ? 100 : isActive ? 50 : Math.floor(word.depth),
      }}
    >
      <motion.div
        style={{
          x: baseX,
          y: baseY,
          z: isMobile ? 0 : scatterZ,
          rotate: wordRotate,
        }}
        animate={{
          x: repelX,
          y: repelY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          data-word={word.text}
          drag
          dragSnapToOrigin={true}
          dragElastic={0.4}
          onDrag={(e, info) => onDrag(info)}
          onDragEnd={onDragEnd}
          onMouseEnter={onSelect}
          onMouseLeave={onDeselect}
          onTouchStart={onSelect}
          whileDrag={{
            scale: 1.18,
            zIndex: 100,
            cursor: "grabbing",
          }}
          style={{
            fontSize: word.size,
            fontWeight: word.weight,
            userSelect: "none",
            cursor: isBeingDragged ? "grabbing" : "grab",
            whiteSpace: "nowrap",
            letterSpacing: "-0.035em",
            wordSpacing: "-0.06em",
            lineHeight: 1,
            transformOrigin: "center center",
            filter: isDimmed ? "blur(1px)" : "blur(0px)",
          }}
          animate={{
            scale: isActive ? 1.15 : 1,
            opacity: isDimmed ? 0.2 : 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <motion.div style={{ opacity: isMobile ? 1 : scrollOpacity }}>
            {SplitText ? (
              <SplitText
                text={word.text}
                hoveredWord={isActive ? word.text : null}
                baseColor="#2d3748"
                hoverColor={word.color}
                isMobile={isMobile}
              />
            ) : (
              <span
                style={{
                  color: isActive ? word.color : "#2d3748",
                  transition: "color 0.2s ease",
                }}
              >
                {word.text}
              </span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}