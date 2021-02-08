const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comments = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
    "Post",
    Schema({
        title: String,
        detail: String,
        comments: [Comments],
    })
);
