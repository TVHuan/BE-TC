const db = require("../config/db");

const BienSo = {
  getAll: (callback) => {
    db.query("SELECT * FROM bien_so", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM bien_so WHERE id = ?", [id], callback);
  },

  // Lấy biển số theo biển số xe
  getByBienSo: (bien_so, callback) => {
    const query = "SELECT * FROM bien_so WHERE bien_so = ?";
    db.query(query, [bien_so], callback);
  },

  create: (bienSo, callback) => {
    const { bien_so, hinh_anh, chi_tiet, nguon } = bienSo;
    db.query(
      "INSERT INTO bien_so (bien_so, hinh_anh, chi_tiet, nguon) VALUES (?, ?, ?, ?)",
      [bien_so, hinh_anh, chi_tiet, nguon],
      callback
    );
  },
};

module.exports = BienSo;
