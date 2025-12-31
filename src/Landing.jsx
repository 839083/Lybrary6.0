import { useNavigate } from "react-router-dom";
import libraryBg from "./assets/library-bg.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const goToAuth = () => {
    navigate("/auth");
  };

  return (
    <div style={styles.hero}>
      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>📘 LibroSphere</div>
        <button style={styles.navBtn} onClick={goToAuth}>
          Join Now
        </button>
      </nav>

      {/* Hero Content */}
      <section style={styles.heroContent}>
        <span style={styles.subtitle}>
          Digital Library Management System
        </span>

        <h1 style={styles.heading}>
          A Smarter Approach
          <br />
          to Library Management
        </h1>

        <p style={styles.description}>
          A centralized platform designed for academic libraries to manage
          book circulation, users, and records with clarity and reliability.
        </p>

        <button style={styles.ctaBtn} onClick={goToAuth}>
          Get Started
        </button>
      </section>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  hero: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage: `url(${libraryBg})`, // ✅ FIX HERE
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to right, rgba(11,16,32,0.92) 35%, rgba(11,16,32,0.75) 60%, rgba(11,16,32,0.55))",
    zIndex: 1,
  },

  navbar: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 72px",
  },

  logo: {
    fontSize: "24px",
    fontWeight: 600,
  },

  navBtn: {
    background: "#ffffff",
    color: "#0b1020",
    border: "none",
    padding: "10px 22px",
    borderRadius: "22px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "640px",
    padding: "140px 72px",
  },

  subtitle: {
    display: "block",
    fontSize: "13px",
    letterSpacing: "0.4px",
    opacity: 0.75,
    marginBottom: "20px",
  },

  heading: {
    fontSize: "56px",
    fontWeight: 600,
    lineHeight: 1.1,
    marginBottom: "24px",
  },

  description: {
    fontSize: "17px",
    lineHeight: 1.6,
    opacity: 0.9,
    marginBottom: "36px",
  },

  ctaBtn: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.35)",
    padding: "14px 34px",
    borderRadius: "28px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
