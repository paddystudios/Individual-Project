// src/components/Skeletons.jsx
// Simple CSS-only shimmer skeletons. No external libraries.
// Drop-in replacements for CardSkeleton, RowSkeleton, AvatarTextSkeleton, GridSkeleton.

// Inject global keyframes once per mount
const SkeletonStyles = () => (
  <style>{`
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .skel {
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg,
        rgba(255,255,255,0.06) 25%,
        rgba(255,255,255,0.14) 37%,
        rgba(255,255,255,0.06) 63%);
      background-size: 200% 100%;
      animation: shimmer 1.25s linear infinite;
      border-radius: 8px;
    }
  `}</style>
);

export function CardSkeleton({ coverHeight = 160, lines = 2 }) {
  return (
    <div>
      <SkeletonStyles />
      <div className="skel" style={{ height: coverHeight, borderRadius: 12, width: "100%" }} />
      <div style={{ marginTop: 8 }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="skel" style={{ height: 16, marginTop: 6, width: "100%" }} />
        ))}
      </div>
    </div>
  );
}

export function RowSkeleton({ items = 6, itemWidth = 140 }) {
  return (
    <div style={{ display: "flex", gap: 16, overflow: "auto" }}>
      <SkeletonStyles />
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} style={{ width: itemWidth, flex: "0 0 auto" }}>
          <div className="skel" style={{ width: "100%", height: itemWidth, borderRadius: 12 }} />
          <div className="skel" style={{ height: 14, marginTop: 8, width: "100%" }} />
        </div>
      ))}
    </div>
  );
}

export function AvatarTextSkeleton() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <SkeletonStyles />
      <div className="skel" style={{ width: 40, height: 40, borderRadius: "50%" }} />
      <div style={{ flex: 1 }}>
        <div className="skel" style={{ width: "100%", height: 16 }} />
        <div className="skel" style={{ width: "60%", height: 12, marginTop: 6 }} />
      </div>
    </div>
  );
}

export function GridSkeleton({ cols = 4, count = 8 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 16,
      }}
    >
      <SkeletonStyles />
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ReviewSkeleton({ count = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SkeletonStyles />
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: 16,
            borderRadius: 12,
            border: "1px solid #232323",
          }}
        >
          <div
            className="skel"
            style={{
              width: 84,
              height: 84,
              borderRadius: 8,
              flex: "0 0 auto",
            }}
          />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="skel" style={{ height: 14, width: "28%" }} />
            <div className="skel" style={{ height: 20, width: "42%", borderRadius: 6 }} />
            <div className="skel" style={{ height: 12, width: "18%" }} />
            <div className="skel" style={{ height: 12, width: "85%" }} />
            <div className="skel" style={{ height: 12, width: "65%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}