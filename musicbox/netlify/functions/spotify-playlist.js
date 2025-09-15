// netlify/functions/spotify-playlist.js
export async function handler(event) {
  try {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      return json(500, { error: "Missing Spotify env vars" });
    }

    // 1) App token
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

    const tokenJson = await tokenRes.json().catch(() => ({}));
    if (!tokenRes.ok || !tokenJson?.access_token) {
      // Surface the real Spotify error so you can see it in the dev console
      return json(tokenRes.status || 500, {
        error: "Spotify token error",
        details: tokenJson,
      });
    }

    const accessToken = tokenJson.access_token;

    // 2) Decide endpoint
    const params = new URLSearchParams(event.queryStringParameters || {});
    const q = params.get("q")?.trim();
    const limit = clampInt(params.get("limit"), 1, 50, 18);
    const country = params.get("country") || "SE";

    let url;
    if (q) {
      // Search for playlists by query
      url =
        "https://api.spotify.com/v1/search?" +
        new URLSearchParams({
          type: "playlist",
          q,
          limit: String(limit),
          market: country, // harmless for playlists, helps consistency
        }).toString();
    } else {
      // Featured playlists (avoid regional 404s by specifying country)
      url =
        "https://api.spotify.com/v1/browse/featured-playlists?" +
        new URLSearchParams({
          country,
          limit: String(limit),
        }).toString();
    }

    const apiRes = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await apiRes.json().catch(() => ({}));

    if (!apiRes.ok) {
      return json(apiRes.status, { error: "Spotify API error", details: data });
    }

    // 3) Normalize shape so frontend can always read data.playlists.items
    const list = data?.playlists?.items ?? data?.playlists ?? data?.items ?? [];
    return json(200, { playlists: { items: list } });
  } catch (err) {
    return json(500, { error: err.message || String(err) });
  }
}

// Helpers
function json(statusCode, obj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      // Allow local browser calls
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(obj),
  };
}
function clampInt(raw, min, max, fallback) {
  const n = parseInt(raw, 10);
  if (Number.isFinite(n)) return Math.max(min, Math.min(max, n));
  return fallback;
}