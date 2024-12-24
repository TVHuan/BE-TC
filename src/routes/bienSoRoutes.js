const express = require("express");
const router = express.Router();
const BienSoController = require("../controller/bienSoController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/bien-so", BienSoController.getAll);
router.get("/bien-so/:id", BienSoController.getById);
router.post("/bien-so", BienSoController.create);
router.delete(
  "/bien-so/:id",
  authenticate,
  authorize("quan_tri"),
  BienSoController.deleteBienSo
);

module.exports = router;
