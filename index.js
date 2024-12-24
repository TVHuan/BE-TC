// index.js
const express = require("express");
const app = express();
const path = require("path");
const corsMiddleware = require("./src/middleware/cors");
const bienSoRoutes = require("./src/routes/bienSoRoutes");
const nguoiDungRoutes = require("./src/routes/nguoiDungRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

app.use(express.json());
app.use(corsMiddleware); // Sử dụng middleware cors
app.use("/api", bienSoRoutes);
app.use("/api", nguoiDungRoutes);
app.use(errorMiddleware);
// Cấu hình để phục vụ tệp từ thư mục 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", require("./src/routes/bienSoRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
