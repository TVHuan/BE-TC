const BienSo = require("../models/bienSo");
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

// Cấu hình multer để lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Đường dẫn lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Chỉ hỗ trợ định dạng ảnh PNG, JPG, GIF"));
    }
    cb(null, true);
  },
}).single("hinh_anh"); // Chỉ định tên trường ảnh

const BienSoController = {
  // Lấy danh sách biển số
  getAll: (req, res) => {
    BienSo.getAll((err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(result);
    });
  },

  // Lấy biển số theo ID
  getById: (req, res) => {
    const { id } = req.params;
    BienSo.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!result) {
        return res.status(404).json({ error: "Không tìm thấy biển số" });
      }
      res.status(200).json(result);
    });
  },

  // Tạo mới biển số
  create: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Lỗi tải lên hình ảnh: " + err.message });
      }

      const { bien_so, chi_tiet, nguon } = req.body;
      const hinh_anh = req.file ? `/uploads/${req.file.filename}` : null;

      if (!bien_so || !chi_tiet || !nguon || !hinh_anh) {
        return res
          .status(400)
          .json({ error: "Vui lòng cung cấp đầy đủ dữ liệu" });
      }

      BienSo.create({ bien_so, hinh_anh, chi_tiet, nguon }, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Lỗi khi tạo biển số: " + err.message });
        }
        res.status(201).json({
          message: "Biển số đã được tạo",
          id: result.insertId,
          bien_so: bien_so,
          hinh_anh: hinh_anh,
        });
      });
    });
  },

  // Xóa biển số
  deleteBienSo: (req, res) => {
    const { id } = req.params;

    if (req.user.vai_tro !== "quan_tri") {
      return res.status(403).json({ error: "Bạn không có quyền xóa biển số" });
    }

    BienSo.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi hệ thống" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Biển số không tồn tại" });
      }

      res.status(200).json({ message: "Xóa biển số thành công" });
    });
  },
};

module.exports = BienSoController;
module.exports.storage = storage;
module.exports.upload = upload;
