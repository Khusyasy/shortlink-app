var mongoose = require("mongoose");

var linkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    longUrl: String,
    shortUrl: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{ timestamps: true });

module.exports = mongoose.model("Link", linkSchema);