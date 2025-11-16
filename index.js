// ---- YT AUTO BACKEND (Upload Enabled) ---- //

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ---- Your API Key (Put yours here) ---- //
const API_KEY = "AIzaSyDJaeoj7o9fLrYb7RJWdnhOUnhE1zFuk2Q";

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 YT Auto Backend LIVE | Upload Enabled");
});


// ----------- UPLOAD ROUTE (REAL UPLOAD) ---------------
app.post("/upload-video", async (req, res) => {
  try {
    const { videoUrl, title, description } = req.body;

    if (!videoUrl) return res.json({ error: "videoUrl missing!" });

    // Download Video File
    const filePath = path.join(__dirname, "video.mp4");
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "stream"
    });

    response.data.pipe(writer);

    await new Promise((resolve) => writer.on("finish", resolve));


    // ---- Upload via YouTube API ---- //
    const uploadResponse = await axios.post(
      `https://www.googleapis.com/upload/youtube/v3/videos?uploadType=media&part=snippet,status&key=${API_KEY}`,
      fs.readFileSync(filePath),
      {
        headers: {
          "Content-Type": "video/*"
        }
      }
    );

    const videoId = uploadResponse.data.id;

    // Set Video Title & Description
    await axios.put(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${API_KEY}`,
      {
        id: videoId,
        snippet: {
          title: title || "AI Auto Upload Video",
          description: description || "Uploaded automatically via API 😎",
          categoryId: "22"
        }
      }
    );

    res.json({
      status: "success",
      videoId,
      message: "🔥 Your video uploaded successfully!"
    });

  } catch (error) {
    res.json({ error: error.message });
  }
});




// -------- Old Demo Routes (unchanged) ----------
app.get("/generate-video", (req, res) => {
  res.json({
    step: "generate-video",
    status: "ok",
    message: "Demo: AI ने वीडियो बना दी (demo)."
  });
});

app.get("/generate-thumbnail", (req, res) => {
  res.json({
    step: "generate-thumbnail",
    status: "ok",
    message: "Demo: Thumbnail ready (demo)."
  });
});

app.get("/seo-optimize", (req, res) => {
  res.json({
    step: "seo-optimize",
    status: "ok",
    message: "Demo: SEO done (demo)."
  });
});


app.listen(PORT, () => {
  console.log("YT Auto Backend (Upload Enabled) running on port", PORT);
});
