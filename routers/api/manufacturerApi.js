const express = require("express");
const router = express.Router();
const Manufacturer = require("../../models/manufacturer");

router.post("/", (req, res) => {
    const { name, city, state, category } = req.body;
    const newManufacturer = new Manufacturer({
        name,
        city,
        state,
        category,
    });

    newManufacturer
        .save()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

//gets all
router.get("/", (req, res) => {
    Manufacturer.find()
        .populate("category", "name")
        .sort({ name: 1 })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(404).json(err));
});

router.delete("/:id", (req, res) => {
    Manufacturer.findByIdAndDelete(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
