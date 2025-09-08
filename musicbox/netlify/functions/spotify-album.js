// /functions/spotify-album.js
// Fetch Spotify album by id *or* by search query `q` (e.g. "album:Full Moon artist:Brandy")

const tokenURL = "https://accounts.spotify.com/api/token";
const apiBase = "https://api.spotify.com/v1";

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  const creds = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const res = await fetch(tokenURL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Token error: ${res.status} ${txt}`);
  }
  return res.json();
}

async function fetchJSON(url, accessToken) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Spotify API error ${res.status}: ${txt}`);
  }
  return res.json();
}

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const id = params.id?.trim();
    const q = params.q?.trim();

    if (!id && !q) {
      return { statusCode: 400, body: JSON.stringify({ error: "Provide ?id=<albumId> or ?q=<search query>" }) };
    }

    const { access_token } = await getAccessToken();

    let albumId = id;

    // If no ID, search by query (type=album)
    if (!albumId) {
      const searchURL = `${apiBase}/search?type=album&limit=1&q=${encodeURIComponent(q)}`;
      const search = await fetchJSON(searchURL, access_token);
      const first = search?.albums?.items?.[0];
      if (!first) {
        return { statusCode: 404, body: JSON.stringify({ error: "Album not found for query", q }) };
      }
      albumId = first.id;
    }

    const album = await fetchJSON(`${apiBase}/albums/${albumId}`, access_token);
    return { statusCode: 200, body: JSON.stringify(album) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};