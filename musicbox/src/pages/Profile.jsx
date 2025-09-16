// src/pages/Profile.jsx
import ProfileHeader from "../components/ProfileHeader";
import RecentActivity from "../components/RecentActivity";
import TopAlbums from "../components/TopAlbums";
import StarRatingChart from "../components/StarRatingChart";
import { LibraryStatsList } from "../components/LibraryStatsList";

export default function Profile() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Roboto, sans-serif" }}>
      <ProfileHeader />
      <TopAlbums />
      <RecentActivity />
      <StarRatingChart />
      <LibraryStatsList />
    </main>
  );
}