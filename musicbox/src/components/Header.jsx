import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/reviews", label: "Reviews" },
  { to: "/playlists", label: "Playlists" },
  { to: "/profile", label: "Profile" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold tracking-tight">MusicBox</div>
        <nav className="flex gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}