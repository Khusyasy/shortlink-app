var mongoose = require("mongoose");

var linkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    long: String,
    short: String
});

module.exports = mongoose.model("Link", linkSchema);