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
        <input
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
        />
        <button
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
          onClick={() => alert("Open add review flow (placeholder)")}
        >
          + Add Review
        </button>
      </div>
    );
  }