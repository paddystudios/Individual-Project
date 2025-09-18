const base = "/.netlify/functions/spotify-album";

export async function fetchAlbum(input) {
  let qs = "";

  if (typeof input === "string") {
    if (input.startsWith("album:")) {
      // Treat as a search query (e.g., "album:... artist:...")
      qs = `?q=${encodeURIComponent(input)}`;
    } else {
      // Treat as a direct album ID
      qs = `?id=${encodeURIComponent(input)}`;
    }
  } else if (input?.q) {
    qs = `?q=${encodeURIComponent(input.q)}`;
  } else if (input?.id) {
    qs = `?id=${encodeURIComponent(input.id)}`;
  }

  const res = await fetch(`${base}${qs}`);
  if (!res.ok) {
    throw new Error(`Album fetch failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// ---------------- NEW PLAYLIST HELPERS ----------------

const playlistBase = "/.netlify/functions/spotify-playlist";

// Generic fetcher
export async function fetchPlaylist({ id, q, limit } = {}) {
  const params = new URLSearchParams();
  if (id) params.set("id", id);
  if (q) params.set("q", q);
  if (limit) params.set("limit", String(limit));

  const res = await fetch(
    `${playlistBase}${params.toString() ? "?" + params.toString() : ""}`
  );

  if (!res.ok) {
    throw new Error(`Playlist fetch failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Search playlists
export async function searchPlaylists(q, limit = 12) {
  const data = await fetchPlaylist({ q, limit });
  if (data?.playlists?.items) return data.playlists.items;
  if (data?.id) return [data];
  return [];
}

// Featured playlists
export async function getFeaturedPlaylists(limit = 18) {
  const res = await fetch(`/.netlify/functions/spotify-playlist?limit=${limit}`);
  if (!res.ok) throw new Error(`Playlist fetch failed: ${res.status}`);
  return res.json();
}