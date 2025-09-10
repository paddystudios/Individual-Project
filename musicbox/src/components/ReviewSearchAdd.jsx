import { useMemo, useState } from "react";

/** Mini album DB for search – add/remove as you like */
const SUGGESTED_ALBUMS = [
  {
    id: "clb",
    title: "Certified Lover Boy",
    artist: "Drake",
    image: "https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f",
    url: "https://open.spotify.com/album/3SpBlxme9WbeQdI9kx7KAV",
  },
  {
    id: "full-moon",
    title: "Full Moon",
    artist: "Brandy",
    image: "https://i.scdn.co/image/ab67616d0000b2735aba6e8dbc6eaa63b843cd0f",
    url: "https://open.spotify.com/album/1cG8xqgax0PnhG6vKrrO3O",
  },
  {
    id: "heaven-knows",
    title: "Heaven Knows",
    artist: "PinkPantheress",
    image: "https://i.scdn.co/image/ab67616d0000b2734d5b1a85e3e5f9358b9edc7c",
    url: "https://open.spotify.com/album/6y4rN3Wf9rM2TQhVdJvGuM",
  },
  {
    id: "sos",
    title: "SOS",
    artist: "SZA",
    image: "https://i.scdn.co/image/ab67616d0000b2736a1f1d6a59b0ca86b6f5d6f2",
    url: "https://open.spotify.com/album/07w0rG5TETcyihsEIZR3qG",
  },
];

function AddReviewForm({ onAdd, onClose }) {
  const [lookup, setLookup] = useState("");
  const [chosen, setChosen] = useState(null);
  const [stars, setStars] = useState(5);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const results = useMemo(() => {
    const q = lookup.trim().toLowerCase();
    if (!q) return SUGGESTED_ALBUMS;
    return SUGGESTED_ALBUMS.filter(
      (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)
    );
  }, [lookup]);

  const canSubmit = chosen && user.trim() && text.trim();

  return (
    <div style={{ border: "1px solid #fff", borderRadius: 12, padding: "1rem", background: "#0c0c0c" }}>
      <h2 style={{ margin: 0, marginBottom: 12 }}>Add review</h2>

      <label style={{ display: "block", fontSize: 14, color: "#bbb" }}>Search album</label>
      <input
        value={lookup}
        onChange={(e) => setLookup(e.target.value)}
        placeholder="Type album or artist…"
        style={{
          width: "100%", marginTop: 6, marginBottom: 12, padding: "10px 12px",
          borderRadius: 8, border: "1px solid #333", background: "#111", color: "#fff",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12, marginBottom: 12 }}>
        {results.map((a) => (
          <button
            key={a.id}
            onClick={() => setChosen(a)}
            style={{
              textAlign: "left",
              borderRadius: 10,
              border: chosen?.id === a.id ? "2px solid #FFD027" : "1px solid #333",
              padding: 8, background: "#121212", cursor: "pointer", color: "#fff",
            }}
          >
            <img src={a.image} alt="" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 6 }} />
            <div style={{ marginTop: 8, fontWeight: 500 }}>{a.title}</div>
            <div style={{ color: "#aaa", fontSize: 13 }}>{a.artist}</div>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ color: "#bbb", fontSize: 14 }}>Your rating:</span>
        {[1,2,3,4,5].map((n) => (
          <button
            key={n}
            onClick={() => setStars(n)}
            style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 22, color: n <= stars ? "#FFD027" : "#333" }}
          >★</button>
        ))}
      </div>

      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Your @username"
        style={{
          width: "100%", marginBottom: 12, padding: "10px 12px",
          borderRadius: 8, border: "1px solid #333", background: "#111", color: "#fff",
        }}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts…"
        rows={4}
        style={{
          width: "100%", marginBottom: 12, padding: "10px 12px",
          borderRadius: 8, border: "1px solid #333", background: "#111", color: "#fff", resize: "vertical",
        }}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => { if (!canSubmit) return; onAdd({ album: chosen, stars, user: user.replace(/^@/, ""), text }); onClose(); }}
          disabled={!canSubmit}
          style={{
            padding: "10px 14px", borderRadius: 8, border: "1px solid #333",
            background: canSubmit ? "#FFD027" : "#333", color: canSubmit ? "#000" : "#777",
            cursor: canSubmit ? "pointer" : "not-allowed", fontWeight: 600,
          }}
        >
          Add review
        </button>
        <button
          onClick={onClose}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #333", background: "#111", color: "#fff", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function ReviewsSearchAdd({ onSearch, onAdd }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Reviews</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search reviews…"
            style={{
              padding: "10px 12px", borderRadius: 999, border: "1px solid #333",
              background: "#111", color: "#fff", minWidth: 220,
            }}
          />
          <button
            onClick={() => setOpen((s) => !s)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 14px", borderRadius: 999, border: "1px solid #333",
              background: "#111", color: "#fff", cursor: "pointer",
            }}
          >
            <span style={{
              display: "inline-grid", placeItems: "center", width: 22, height: 22,
              borderRadius: "50%", background: "#FFD027", color: "#000", fontWeight: 800,
            }}>+</span>
            Add review
          </button>
        </div>
      </div>

      {open && (
        <div style={{ marginBottom: 16 }}>
          <AddReviewForm onAdd={onAdd} onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}