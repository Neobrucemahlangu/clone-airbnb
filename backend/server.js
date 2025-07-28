import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React frontend build in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the root 'build' folder
  app.use(express.static(path.join(__dirname, "../build")));

  // For any other routes, serve index.html from 'build'
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}

// Example API route
app.get("/api", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
