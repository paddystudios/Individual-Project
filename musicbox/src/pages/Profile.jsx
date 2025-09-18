// src/pages/Profile.jsx
import ProfileHeader from "../components/ProfileHeader";
import RecentActivity from "../components/RecentActivity";
import TopAlbums from "../components/TopAlbums";
import StarRatingChart from "../components/StarRatingChart";
import { LibraryStatsList } from "../components/LibraryStatsList";
import RevealOnScroll from "../components/RevealOnScroll";
import BackgroundHero from "../components/BackgroundHero";

export default function Profile() {
  return (
    <main style={{ fontFamily: "Roboto, sans-serif" }}>
      <RevealOnScroll from="up" distance={40}>
        <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
          <BackgroundHero />
          <div style={{ padding: "2rem", fontFamily: "Roboto, sans-serif" }}>
            <ProfileHeader />
          </div>
        </div>
      </RevealOnScroll>
      <div style={{ padding: "2rem", fontFamily: "Roboto, sans-serif" }}>
        <RevealOnScroll from="up" distance={40}>
          <TopAlbums />
        </RevealOnScroll>
        <RevealOnScroll from="up" distance={40}>
          <RecentActivity />
        </RevealOnScroll>
        <RevealOnScroll from="up" distance={40}>
          <StarRatingChart />
        </RevealOnScroll>
        <RevealOnScroll from="up" distance={40}>
          <LibraryStatsList />
        </RevealOnScroll>
      </div>
    </main>
  );
}