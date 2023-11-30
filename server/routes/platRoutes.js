const express = require("express");
const {
  createPlat,
  getAllPlats,
  getPlatById,
  updatePlat,
  deletePlat,
} = require("../controller/platController");

const router = express.Router();

const multer = require('multer');


const upload = multer({ dest: 'uploads/' });

// Create a new Plat
router.post("/plats", upload.single('image'), createPlat);

// Get all Plats
router.get("/plats", getAllPlats);

// Get a single Plat by ID
router.get("/plats/:id", getPlatById);

// Update a Plat by ID
router.put("/plats/:id", upload.single('image'),  updatePlat);

// Delete a Plat by ID
router.delete("/plats/:id", deletePlat);

module.exports = router;
