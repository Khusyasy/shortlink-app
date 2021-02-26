var mongoose = require("mongoose");

var linkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    long_url: String,
    short_url: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{ timestamps: true });

module.exports = mongoose.model("Link", linkSchema);