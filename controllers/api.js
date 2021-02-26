const mongoose = require("mongoose");
const Link = require("../models/link");

exports.getLinks = async (req, res) => {
    try {
        var links = await Link.find();
        res.json({ status: "success", links: links });
    } catch (err) {
        res.json({ status: "failed", err: err });
    }
}

exports.insertLink = async (req, res) => {
    var link = new Link({
        _id: mongoose.Types.ObjectId(),
        long: "test",
        short: "test",
    });
    try {
        var save = await link.save();
        res.json({ status: "success" });
    } catch (err) {
        res.json({ status: "failed", err: err });
    }
}