import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

import AlbumsGrid from "../components/AlbumsGrid";

export default function Home() {
  return (
    <div style={{ width: "100%", padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}> NEW FROM FRIENDS</h2>
      <AlbumsGrid />
    </div>
  );
}