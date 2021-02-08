const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./category.js");

module.exports = mongoose.model(
    "Manufacturer",
    Schema({
        name: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
    })
);
