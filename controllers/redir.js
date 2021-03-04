const mongoose = require("mongoose");
const Link = require("../models/link");

const URLisValid = require("../helpers/url_validation");

exports.redirToLink = async (req, res) => {
    try {
        var link = await Link.findOe({ shortUrl: req.params.short });
        if (URLisValid(link.longUrl)) {
            res.redirect(link.longUrl)
        }
    } catch (err) {
        res.redirect("/");
    }
}