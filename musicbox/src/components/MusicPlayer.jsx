// src/components/MusicPlayer.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

/**
 * MusicPlayer
 *
 * Fetches one album (change albumQuery to any search string)
 * and renders a hero-style player with:
 * - Big cover art
 * - Title, artist, short description + "Read reviews" link
 * - Simple HTML5 audio player for the first track (uses Spotify preview_url when available)
 * - Row of 6 placeholder user avatars with mini star ratings
 */
export default function MusicPlayer() {
  // Change this to any album you want to showcase
  const albumQuery = useMemo(
    () => ({ q:"album:Dawn FM artist:The Weeknd" }),
    []
  );

  const [album, setAlbum] = useState(null);
  const [firstTrack, setFirstTrack] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const a = await fetchAlbum(albumQuery);
        setAlbum(a);
        // Prefer the first track that has a Spotify preview_url. Many modern tracks have preview disabled.
        const items = a?.tracks?.items || [];
        const withPreview = items.find((t) => !!t.preview_url) || null;
        setFirstTrack(withPreview || items[0] || null);
      } catch (e) {
        setError(e.message || String(e));
      }
    })();
  }, [albumQuery]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, [firstTrack]);

  const duration = audioRef.current?.duration || 0;
  const fmt = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  if (error) {
    return (
      <div style={{ color: "#f66", padding: "1rem", border: "1px solid #f66" }}>
        Music player failed: {error}
      </div>
    );
  }

  if (!album) {
    return <div style={{ color: "white", padding: "1rem" }}>Loading player…</div>;
  }

  const artistName = album.artists?.map((a) => a.name).join(", ");
  const coverUrl = album.images?.[0]?.url;
  const trackName = firstTrack?.name || "First track";
  const previewUrl = firstTrack?.preview_url || ""; // Some Spotify tracks have null preview_url

  const avatars = [
    "https://api.dicebear.com/9.x/thumbs/svg?seed=apples",
    "https://api.dicebear.com/9.x/thumbs/svg?seed=oranges",
    "https://api.dicebear.com/9.x/thumbs/svg?seed=grapes",
    "https://api.dicebear.com/9.x/thumbs/svg?seed=bananas",
    "https://api.dicebear.com/9.x/thumbs/svg?seed=lemons",
    "https://api.dicebear.com/9.x/thumbs/svg?seed=pears",
  ];

  return (
    <div
      style={{
        flex: 1,
        padding: "1.25rem",
        border: "0.5px solid rgba(255,255,255,0.4)",
        borderRadius: 12,
        color: "white",
        background: "#0a0a0a",
      }}
    >
      <h1 style={{ fontSize: 30, fontWeight: 400, marginBottom: 20 }}>New Music</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "1.25rem",
          alignItems: "start",
        }}
      >
        {/* Cover */}
        <div
          style={{
            width: 340,
            height: 340,
            overflow: "hidden",
            borderRadius: 16,
            background: "#111",
            border: "0.5px solid rgba(255,255,255,0.25)",
          }}
        >
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={album.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ padding: "1rem" }}>No cover</div>
          )}
        </div>

        {/* Meta / description */}
        <div>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1.1 }}>{album.name}</h2>
          <p style={{ margin: "6px 0 16px", color: "#bbb", fontSize: 18 }}>{artistName}</p>
          <p style={{ color: "#ddd", maxWidth: 560, lineHeight: 1.45 }}>
            Lorem ipsum dolor sit amet consectetur. Ultrices nec hendrerit cursus eget
            euismod. Ipsum ullamcorper lorem ornare venenatis. Egestas vestibulum nam purus
            iaculis. Semper arcu mauris faucibus proin nulla turpis purus sed sed.
          </p>
          <a
            href={album.external_urls?.spotify}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              textDecoration: "none",
              color: "white",
              marginTop: 12,
            }}
          >
            Read Reviews
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 28,
                borderRadius: 20,
                border: "1px solid white",
              }}
            >
              ➜
            </span>
          </a>
        </div>
      </div>

      {/* Player */}
      <div style={{ marginTop: 22 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <h3 style={{ margin: 0, fontSize: 24 }}>{trackName}</h3>
          <span style={{ color: "#aaa", fontSize: 18 }}>{artistName}</span>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            onClick={togglePlay}
            disabled={!previewUrl}
            title={previewUrl ? (isPlaying ? "Pause" : "Play") : "No preview available"}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              border: "none",
              background: "#222",
              color: "white",
              fontSize: 22,
              cursor: previewUrl ? "pointer" : "not-allowed",
            }}
          >
            {isPlaying ? "❚❚" : "►"}
          </button>

          {/* progress */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa" }}>
              <span>{fmt(currentTime)}</span>
              <span>{duration ? fmt(duration) : "--:--"}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = v;
                  setCurrentTime(v);
                }
              }}
              style={{ width: "100%" }}
              disabled={!previewUrl}
            />
          </div>

          <audio ref={audioRef} src={previewUrl || undefined} onEnded={() => setIsPlaying(false)} />
        </div>

        {!previewUrl && (
          <p style={{ color: "#999", marginTop: 8, fontSize: 13 }}>
            This album's tracks don’t provide a Spotify preview in your region/account. The play button is disabled.
          </p>
        )}
      </div>

      {/* Liked By / avatars */}
      <div style={{ marginTop: 26 }}>
        <h4 style={{ margin: 0, fontSize: 20, color: "#ddd" }}>Liked by</h4>
        <div style={{ display: "flex", gap: 18, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
          {avatars.map((src, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <img
                src={src}
                alt="user avatar"
                style={{ width: 56, height: 56, borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)" }}
              />
              <div style={{ fontSize: 14, letterSpacing: 1, marginTop: 6, color: "#ffd84d" }}>★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}