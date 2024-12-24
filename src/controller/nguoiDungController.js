// /src/controllers/nguoiDungController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NguoiDung = require("../models/nguoiDung");

// Tải biến môi trường
require("dotenv").config();

const NguoiDungController = {
  // Đăng ký
  register: async (req, res) => {
    const { ten_dang_nhap, mat_khau, vai_tro } = req.body;

    try {
      // Kiểm tra nếu tên đăng nhập đã tồn tại
      NguoiDung.getByUsername(ten_dang_nhap, async (err, result) => {
        if (result.length > 0) {
          return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(mat_khau, 10);

        // Tạo người dùng mới
        NguoiDung.create(
          { ten_dang_nhap, mat_khau: hashedPassword, vai_tro },
          (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "Đăng ký thành công" });
          }
        );
      });
    } catch (err) {
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  },

  // Đăng nhập
  login: async (req, res) => {
    const { ten_dang_nhap, mat_khau } = req.body;

    try {
      NguoiDung.getByUsername(ten_dang_nhap, async (err, result) => {
        if (result.length === 0) {
          return res.status(404).json({ error: "Tên đăng nhập không tồn tại" });
        }

        const user = result[0];

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!isMatch) {
          return res.status(400).json({ error: "Mật khẩu không đúng" });
        }

        // Tạo token
        const token = jwt.sign(
          { id: user.id, vai_tro: user.vai_tro },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ message: "Đăng nhập thành công", token });
      });
    } catch (err) {
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  },
};

module.exports = NguoiDungController;
