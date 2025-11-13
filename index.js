const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend Connected! 🔥");
});

// Video Generate API (Sample)
app.get("/gen-video", (req, res) => {
    res.send("Video Generating...");
});

// Thumbnail API (Sample)
app.get("/gen-thumb", (req, res) => {
    res.send("Thumbnail Generating...");
});

// SEO API (Sample)
app.get("/seo", (req, res) => {
    res.send("SEO Running...");
});

// Upload API (Sample)
app.get("/upload", (req, res) => {
    res.send("Upload Started...");
});

// Render Port
app.listen(process.env.PORT || 10000, () => {
    console.log("Server Running...");
});
