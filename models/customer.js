const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Customer",
    Schema({
        name: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        dateJoined: {
            type: Date,
            default: Date.now,
        },
    })
);
