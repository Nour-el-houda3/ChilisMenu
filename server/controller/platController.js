const Plat = require('../models/Plats');

// Create a new Plat
exports.createPlat = async (req, res) => {
  try {
    const plat = new Plat({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.path, 
    });

    await plat.save();
    res.status(201).json(plat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Plats
exports.getAllPlats = async (req, res) => {
  try {
    const plats = await Plat.find();
    res.status(200).json(plats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Plat by ID
exports.getPlatById = async (req, res) => {
  try {
    const plat = await Plat.findById(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: 'Plat not found' });
    }
    res.status(200).json(plat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlat = async (req, res) => {
  try {
    const plat = await Plat.findById(req.params.id);

    if (!plat) {
      return res.status(404).json({ message: 'Plat not found' });
    }

    plat.name = req.body.name || plat.name;
    plat.description = req.body.description || plat.description;
    plat.price = req.body.price || plat.price;

    // Handle image update
    if (req.file) {
      plat.image = req.file.path;
    }

    await plat.save();

    res.status(200).json(plat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a Plat by ID
exports.deletePlat = async (req, res) => {
  try {
    const plat = await Plat.findByIdAndDelete(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: 'Plat not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};