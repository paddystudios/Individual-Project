// src/components/ProfileHeader.jsx
import ProfilePic from "../assets/profilepic.png";

export default function ProfileHeader() {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
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
        }}
      >
        <div
          style={{
            position: "relative",
            width: 252,
            height: 252,
            borderRadius: "9999px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 252,
              height: 252,
              borderRadius: "9999px",
              animation: "ripple-ring 3s infinite",
              boxShadow: "0 0 0 0 rgba(255,230,0,0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 252,
              height: 252,
              borderRadius: "9999px",
              animation: "ripple-ring 3s infinite 1.5s",
              boxShadow: "0 0 0 0 rgba(255,230,0,0.7)",
            }}
          />
          <img
            src={ProfilePic}
            alt="Profile"
            style={{
              width: 240,
              height: 240,
              objectFit: "cover",
              borderRadius: "9999px",
              border: "4px solid #FFE600",
              animation: "spin-record 6s linear infinite",
              position: "relative",
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              backgroundColor: "#000",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
          />
        </div>
        <h1 style={{ margin: 0, fontWeight: 400 }}>Mohamed Guled</h1>
        <p style={{ margin: "0.25rem 0 0", color: "#bbb" }}>@paddywaddy</p>
      </div>
    </section>
  );
}