// src/components/ProfileHeader.jsx
import { useEffect, useState } from "react";
import ProfilePic from "../assets/profilepic.png";
import NeedleArm from "../assets/NeedleArm.png";
import MusicPlayerMini from "./MusicPlayerMini";
import { fetchAlbum } from "../lib/spotify";

export default function ProfileHeader() {
  const [cover, setCover] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const album = await fetchAlbum({ q: "album:Fancy That artist:PinkPantheress" });
        const img = album?.images?.[0]?.url || album?.album?.images?.[0]?.url;
        if (alive) setCover(img || null);
      } catch (e) {
        if (alive) setCover(null);
      }
    })();
    return () => { alive = false; };
  }, []);
  return (
    <section style={{ position: "relative", marginBottom: "2.5rem", borderRadius: "1rem" }}>
      <style>
        {`
          @keyframes spin-record {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes ripple-ring {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 230, 0, 0.7);
              opacity: 1;
            }
            70% {
              box-shadow: 0 0 0 20px rgba(255, 230, 0, 0);
              opacity: 0;
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 230, 0, 0);
              opacity: 0;
            }
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0.1rem",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 300,
            height: 300,
            borderRadius: "9999px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "9999px",
              animation: "ripple-ring 3s infinite",
              boxShadow: "0 0 0 0 rgba(255,230,0,0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "9999px",
              animation: "ripple-ring 3s infinite 1.5s",
              boxShadow: "0 0 0 0 rgba(255,230,0,0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              borderRadius: "9999px",
              backgroundColor: "black",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
          />
          <img
            src={ProfilePic}
            alt="Profile"
            style={{
              width: 288,
              height: 288,
              objectFit: "cover",
              borderRadius: "9999px",
              animation: "spin-record 6s linear infinite",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 12px 35px rgba(0,0,0,0.7)",
            }}
          />
          <img
            src={NeedleArm}
            alt="Needle Arm"
            style={{
              position: "absolute",
              top: "10px",
              right: "-40px",
              width: "150px",
              transform: "rotate(20deg)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />
        </div>
        <h1 style={{ paddingTop: "80px", margin: 0, fontWeight: 400, color: "#FFE600", fontFamily: "Thunder-BlackLC, sans-serif" , fontSize: "5.5rem" }}>Mohamed Guled</h1>
        <p style={{ margin: "0.25rem 0 0", color: "#bbb", paddingBottom: "80px"}}>@paddywaddy</p>
      </div>
      <div style={{position: "absolute", top: "-3rem", right: "0rem", zIndex: 10 }}>
        <MusicPlayerMini
          track="Illegal"
          artist="PinkPantheress"
          cover={cover}
        />
      </div>
    </section>
  );
}