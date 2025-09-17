import { motion } from "framer-motion";
export default function ReviewSearchBar() {
    return (
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <motion.input
          placeholder="Search albums…"
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            color: "white",
            border: "1px solid white",
            borderRadius: "10px",
            outline: "none",
            background: "black",
          }}
          whileFocus={{ scale: 1.02, boxShadow: "0 0 12px rgba(255,255,255,0.5)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.button
          type="button"
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: "1px solid white",
            background: "black",
            color: "white",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
          whileHover={{ scale: 1.05, backgroundColor: "#111" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => alert("Open add review flow (placeholder)")}
        >
          + Add Review
        </motion.button>
      </div>
    );
  }