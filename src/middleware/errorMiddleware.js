// /src/middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
};

module.exports = errorMiddleware;
