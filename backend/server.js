const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const assignmentRoutes = require("./routes/assignments");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/assignments", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("Library Management Backend Running");
});

/* ================= MONGODB ATLAS ================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((err) =>
    console.error("❌ MongoDB Atlas connection error:", err.message)
  );

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
