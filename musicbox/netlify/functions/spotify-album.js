// netlify/functions/spotify-album.js
export async function handler(event) {
  try {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Spotify env vars" }),
      };
    }

    // Get app token
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token;

    const params = new URLSearchParams(event.queryStringParameters || {});
    const id = params.get("id");
    const q  = params.get("q");

    if (!id && !q) {
      return { statusCode: 400, body: JSON.stringify({ error: "Provide id or q" }) };
    }

    let url;
    if (id) {
      url = `https://api.spotify.com/v1/albums/${encodeURIComponent(id)}`;
    } else {
      url = `https://api.spotify.com/v1/search?type=album&limit=1&q=${encodeURIComponent(q)}`;
    }

    const apiRes = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await apiRes.json();

    if (!apiRes.ok) {
      return {
        statusCode: apiRes.status,
        body: JSON.stringify({ error: "Spotify API error", details: data }),
      };
    }

    const album = id ? data : (data.albums?.items?.[0] ?? null);
    return { statusCode: 200, body: JSON.stringify(album) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}