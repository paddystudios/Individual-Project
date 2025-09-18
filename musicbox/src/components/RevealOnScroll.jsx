// src/components/RevealOnScroll.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Reusable scroll-reveal wrapper WITHOUT external deps
export default function RevealOnScroll({
  children,
  from = "up", // "up" | "down" | "left" | "right"
  distance = 50,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  style,
  className,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  const offset = { x: 0, y: 0 };
  if (from === "up") offset.y = distance;
  if (from === "down") offset.y = -distance;
  if (from === "left") offset.x = distance;
  if (from === "right") offset.x = -distance;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}