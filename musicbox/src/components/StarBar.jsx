export default function StarBar({ value = 5, size = 16 }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < value);
    return (
      <div style={{ display: "inline-flex", gap: 2 }}>
        {stars.map((on, i) => (
          <span key={i} style={{ color: on ? "#FFD027" : "#333", fontSize: size }}>★</span>
        ))}
      </div>
    );
  }