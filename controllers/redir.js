const mongoose = require("mongoose");
const Link = require("../models/link");

const URLisValid = require("../helpers/url_validation");

exports.redirToLink = async (req, res) => {
    try {
        var link = await Link.findOneAndUpdate({ shortUrl: req.params.short }, { $inc:{clicks: 1}});
        if (URLisValid(link.longUrl)) {
            res.redirect(link.longUrl)
        }
    } catch (err) {
        res.redirect("/");
    }
}