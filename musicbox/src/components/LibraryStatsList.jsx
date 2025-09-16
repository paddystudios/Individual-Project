export function LibraryStatsList({
    items = [
      "Albums",
      "Songs",
      "Playlists",
      "Lists",
      "Likes",
      "Tags",
      "Following",
      "Followers",
    ],
    min = 10,
    max = 999,
    title = "",
  }) {
    // Simple deterministic number per label so it doesn't change every render
    const hash = (str) =>
      Array.from(str).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 0);
    const seededInt = (seed, a, b) => {
      const x = Math.sin(seed) * 10000;
      const frac = x - Math.floor(x);
      return a + Math.floor(frac * (b - a + 1));
    };
  
    return (
      <section style={{ marginBottom: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {title ? (
          <h3 style={{ margin: 0, marginLeft: "10px", marginBottom: "0.5rem", fontWeight: 300 }}>
            {title}
          </h3>
        ) : null}
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          overflow: "hidden",
        }}>
          {items.map((label, idx) => {
            const n = seededInt(hash(label) + idx * 17, min, max);
            return (
              <li
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "0.75rem 1rem",
                  borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ opacity: 0.95 }}>{label}</span>
                <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 200, opacity: 0.6}}>{n}</span>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }