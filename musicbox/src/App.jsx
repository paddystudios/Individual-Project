import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Reviews from "./pages/Reviews.jsx";
import Playlists from "./pages/Playlists.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-['Roboto'] flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}