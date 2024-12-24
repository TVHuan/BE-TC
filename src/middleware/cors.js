// src/middleware/cors.js
const cors = require("cors");

const corsOptions = {
  origin: "https://check-bien-so-tai-nan.onrender.com", // Cho phép tất cả các nguồn gốc
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Cho phép tất cả các phương thức
  allowedHeaders: ["Content-Type", "Authorization"], // Cho phép các header này
};

module.exports = cors(corsOptions);
