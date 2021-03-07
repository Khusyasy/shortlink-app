const mongoose = require("mongoose");
const Link = require("../models/link");

const URLisValid = require("../helpers/url_validation");

exports.redirToLink = async (req, res) => {
    try {
        var link = await Link.findOne({ shortUrl: req.params.short });
        if (URLisValid(link.longUrl)) {
            res.redirect(link.longUrl)
        }
    } catch (err) {
        res.redirect("/error");
    }
}