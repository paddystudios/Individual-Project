import { useEffect, useState, useRef } from "react";
import { fetchAlbum } from "../lib/spotify";

import AlbumsGrid from "../components/AlbumsGrid";
import PopularSection from "../components/PopularSection";
import ForYouGrid from "../components/ForYouGrid";
import MusicPlayer from "../components/MusicPlayer";
import HeroSection from "../components/HeroSection";
import BackgroundHero from "../components/BackgroundHero";

import { motion } from "framer-motion";
import RevealOnScroll from "../components/RevealOnScroll";


export default function Home() {
  return (
    <>
      <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
        <BackgroundHero />
        <HeroSection />
      </div>
      <RevealOnScroll from="up" distance={50} duration={0.8}
        style={{ 
          width: "100%", 
          padding: "2rem", 
          marginLeft: "auto", 
          marginRight: "auto", 
          maxWidth: "1400px" 
        }}
      >
        <RevealOnScroll from="left" delay={0.05}>
          <h2 style={{ fontSize: "30px", fontWeight: 200}}> New from friends</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <AlbumsGrid />
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <PopularSection />
        </RevealOnScroll>
        <RevealOnScroll from="up" delay={0.2}>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <ForYouGrid />
            <MusicPlayer />
          </div>
        </RevealOnScroll>
      </RevealOnScroll>
    </>
  );
}