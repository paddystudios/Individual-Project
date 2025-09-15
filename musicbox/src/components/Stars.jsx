// src/components/Stars.jsx
export default function Stars({ value = 5, size = 16 }) {
    const count = Math.max(0, Math.min(5, Math.round(value)));
    return (
      <div style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: size,
              height: size,
              lineHeight: `${size}px`,
              textAlign: "center",
              color: i < count ? "#FFD300" : "#555",
              fontSize: size,
            }}
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>
    );
  }