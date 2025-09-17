import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

import AlbumsGrid from "../components/AlbumsGrid";
import PopularSection from "../components/PopularSection";
import ForYouGrid from "../components/ForYouGrid";
import MusicPlayer from "../components/MusicPlayer";
import HeroSection from "../components/HeroSection";
import BackgroundHero from "../components/BackgroundHero";


export default function Home() {
  return (
    <div style={{ 
      width: "100%", 
      padding: "2rem", 
      marginLeft: "auto", 
      marginRight: "auto", 
      maxWidth: "1400px" 
    }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
      <BackgroundHero />
        <HeroSection />
      </div>
      <h2 style={{ fontSize: "30px", fontWeight: 400, marginBottom: "20px" }}> New from friends</h2>
      <AlbumsGrid />
      <PopularSection />
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      <ForYouGrid />
      <MusicPlayer />
    </div>
    </div>
  );
}