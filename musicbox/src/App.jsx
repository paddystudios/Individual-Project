import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./assets/BOPPDLOGO.svg";
import ProfilePic from "./assets/profilepic.png";
import { GridSkeleton } from "./components/Skeletons";


// --- Lazy load pages for route-level code splitting ---
const Home = lazy(() => import("./pages/Home"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Playlists = lazy(() => import("./pages/Playlists"));
const Profile = lazy(() => import("./pages/Profile"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[{ path: "/", element: <Home /> },
          { path: "/reviews", element: <Reviews /> },
          { path: "/playlists", element: <Playlists /> },
          { path: "/profile", element: <Profile /> },
        ].map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.main
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {element}
              </motion.main>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <header
        style={{
          padding: "0.5rem",
          margin: "0.5rem",
          border: "1px solid white",
          borderRadius: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.2rem",
          }}
        >
          <img src={Logo} alt="BOPPD Logo" style={{ height: "35px" }} />
          <>
            <style>
              {`
                .nav-link {
                  position: relative;
                  text-decoration: none;
                  color: inherit;
                }
                .nav-link::after {
                  content: "";
                  position: absolute;
                  left: 0;
                  bottom: -2px;
                  width: 0%;
                  height: 2px;
                  background-color: currentColor;
                  transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                  width: 100%;
                }
              `}
            </style>
            <nav
              style={{
                display: "flex",
                gap: "2rem",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
              }}
            >
              <Link to="/" className="nav-link" style={{ fontWeight: 700, textTransform: "uppercase" }}>
                Home
              </Link>
              <Link
                to="/reviews"
                className="nav-link"
                style={{ fontWeight: 700, textTransform: "uppercase" }}
              >
                Reviews
              </Link>
              <Link
                to="/playlists"
                className="nav-link"
                style={{ fontWeight: 700, textTransform: "uppercase" }}
              >
                Playlists
              </Link>
              <Link
                to="/profile"
                className="nav-link"
                style={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Profile
                <img
                  src={ProfilePic}
                  alt="Profile"
                  style={{ width: "24px", height: "24px", borderRadius: "50%" }}
                />
              </Link>
            </nav>
          </>
        </div>
      </header>

      {/* Suspense shows skeletons while a lazy page is loading */}
      <Suspense fallback={<div style={{ padding: "1rem 1.5rem" }}><GridSkeleton cols={5} count={10} /></div>}>
        <AnimatedRoutes />
      </Suspense>

      <footer
        style={{
          padding: "2rem",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "10px solid yellow",
        }}
      >
        <img src={Logo} alt="BOPPD Logo" style={{ height: "35px" }} />
        <p>By Paddy Studios</p>
      </footer>
    </Router>
  );
}

export default App;