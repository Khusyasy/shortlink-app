const mongoose = require("mongoose");
const Link = require("../models/link");

const createShortID = require("../helpers/short_hash");
const URLisValid = require("../helpers/url_validation");

exports.getLinks = async (req, res) => {
    try {
        var links = await Link.find();
        res.json({ status: "success", links: links });
    } catch (err) {
        res.json({ status: "failed", err: err });
    }
}

exports.insertLink = async (req, res) => {
    var url = req.body.link;
    if (URLisValid(url)) {
        var hashed = createShortID(url + Date.now());
        var link = new Link({
            _id: mongoose.Types.ObjectId(),
            longUrl: url,
            shortUrl: hashed,
            createdBy: null,
            clicks: 0,
        });
        try {
            await link.save();
            res.json({ status: "success", link: link });
        } catch (err) {
            res.json({ status: "failed", err: err });
        }
    } else {
        res.json({ status: "failed", err: "URL is invalid" });
    }
}

exports.getLink = async (req, res) => {
    var query = req.body;
    try {
        var link = await Link.findOne(query);
        if (link) {
            link.shortUrl = `${process.env.BASE_URL}/${link.shortUrl}`;
            res.json({ status: "success", link: link });
        } else {
            throw "Not Found";
        }
    } catch (err) {
        res.json({ status: "failed", err: err });
    }
}