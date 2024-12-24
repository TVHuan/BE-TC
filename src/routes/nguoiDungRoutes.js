// /src/routes/nguoiDungRoutes.js
const express = require("express");
const router = express.Router();
const NguoiDungController = require("../controller/nguoiDungController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Đăng ký
router.post("/register", NguoiDungController.register);

// Đăng nhậpS
router.post("/login", NguoiDungController.login);

// Lấy thông tin người dùng (chỉ admin)
router.get("/users", authenticate, authorize("quan_tri"), (req, res) => {
  // Chỉ admin mới được truy cập route này
  res.status(200).json({ message: "Bạn là admin!" });
});

module.exports = router;
