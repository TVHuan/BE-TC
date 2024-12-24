const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware xác thực người dùng
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user vào req
    next();
  } catch (err) {
    res.status(403).json({ error: "Token không hợp lệ" });
  }
};

// Middleware kiểm tra quyền
const authorize = (vai_tro) => {
  return (req, res, next) => {
    if (req.user.vai_tro !== vai_tro) {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
