// src/components/ProfileHeader.jsx
import ProfilePic from "../assets/profilepic.png";

export default function ProfileHeader() {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0.1rem",
        }}
      >
        <img
          src={ProfilePic}
          alt="Profile"
          style={{
            width: 200,
            height: 200,
            objectFit: "cover",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        />
        <h1 style={{ margin: 0, fontWeight: 400 }}>Mohamed Guled</h1>
        <p style={{ margin: "0.25rem 0 0", color: "#bbb" }}>@paddywaddy</p>
      </div>
    </section>
  );
}