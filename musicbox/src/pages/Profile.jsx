// src/pages/Profile.jsx
import ProfileHeader from "../components/ProfileHeader";
import RecentActivity from "../components/RecentActivity";
import TopAlbums from "../components/TopAlbums";

export default function Profile() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Roboto, sans-serif" }}>
      <ProfileHeader />
      <TopAlbums />
      <RecentActivity />
    </main>
  );
}