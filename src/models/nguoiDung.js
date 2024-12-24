const db = require("../config/db");

const NguoiDung = {
  create: (nguoiDung, callback) => {
    const { ten_dang_nhap, mat_khau, vai_tro } = nguoiDung;
    db.query(
      "INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, vai_tro) VALUES (?, ?, ?)",
      [ten_dang_nhap, mat_khau, vai_tro],
      callback
    );
  },

  getByUsername: (username, callback) => {
    db.query(
      "SELECT * FROM nguoi_dung WHERE ten_dang_nhap = ?",
      [username],
      callback
    );
  },
};

module.exports = NguoiDung;
