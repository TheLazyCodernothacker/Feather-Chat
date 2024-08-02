import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Allow all requests with CORS

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  console.log("starting production app...");

  app.use(express.static(path.join(__dirname, "..", "dist")));
  app.use(express.static(path.join(__dirname, "..", "public")));
}

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (msg) => {
    console.log(msg);
    socket.emit("message", msg);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
