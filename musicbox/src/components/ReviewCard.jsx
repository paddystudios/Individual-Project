import StarBar from "./StarBar";

export default function ReviewCard({ review }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr 170px",
        gap: "1rem",
        border: "0.5px solid #fff",
        borderRadius: 12,
        padding: "1rem",
        background: "#0c0c0c",
        alignItems: "center",
      }}
    >
      <img
        src={review.album.image}
        alt={`${review.album.title} cover`}
        style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 8 }}
      />

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <h3 style={{ margin: 0, fontWeight: 500 }}>{review.album.title}</h3>
          <span style={{ color: "#aaa" }}>{review.album.artist}</span>
        </div>
        <p style={{ margin: "8px 0", color: "#cfcfcf", fontSize: 14 }}>{review.text}</p>
        <a href={review.album.url} target="_blank" rel="noreferrer" style={{ color: "#9cd3ff", fontSize: 14 }}>
          Open in Spotify ↗
        </a>
      </div>

      <div style={{ justifySelf: "end", textAlign: "right" }}>
        <div style={{ marginBottom: 6 }}>
          <StarBar value={review.stars} />
        </div>
        <div style={{ color: "#aaa", fontSize: 14 }}>@{review.user}</div>
      </div>
    </div>
  );
}