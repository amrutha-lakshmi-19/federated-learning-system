const federatedRoutes = require("./src/routes/federatedRoutes");

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/federated", federatedRoutes);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket connection
io.on("connection", (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);

  // Just acknowledge connection
  socket.emit("message", {
    info: "Connected to federated server",
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});
app.set("io", io);

// Test route
app.get("/", (req, res) => {
  res.send("Federated Learning Server is running 🚀");
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});