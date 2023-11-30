const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require("http");
const path = require('path');

const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const router = require("./routes/platRoutes");
const uri = process.env.URI; 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connection.once("open", () => {
  console.log("MongoDB connected");

  server.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

module.exports = app;