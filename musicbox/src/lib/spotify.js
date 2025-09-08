const base = "/.netlify/functions/spotify-album";

export async function fetchAlbum(input) {
  // input can be an id ("3SpBlx...") OR an object { q: "album:... artist:..." }
  const qs =
    typeof input === "string"
      ? `?id=${encodeURIComponent(input)}`
      : input?.q
      ? `?q=${encodeURIComponent(input.q)}`
      : "";

  const res = await fetch(`${base}${qs}`);
  if (!res.ok) {
    throw new Error(`Album fetch failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}