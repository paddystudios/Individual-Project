import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

import AlbumsGrid from "../components/AlbumsGrid";
import PopularSection from "../components/PopularSection";
import ForYouGrid from "../components/ForYouGrid";
import MusicPlayer from "../components/MusicPlayer";

export default function Home() {
  return (
    <div style={{ width: "100%", padding: "2rem" }}>
      <h2 style={{ marginBottom: "0.2rem" }}> NEW FROM FRIENDS</h2>
      <AlbumsGrid />
      <PopularSection />
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      <ForYouGrid />
      <MusicPlayer />
    </div>
    </div>
  );
}