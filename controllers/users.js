const mongoose = require("mongoose");
const User = require("../models/user");

exports.login = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email });
        if (user === null) throw "Not Found";

        var valid = await user.checkPassword(req.body.password);
        if (!valid) throw "Wrong Password";

        res.json({ status: "success", user });
    } catch (err) {
        res.json({ status: "failed", err });
    }
}

exports.register = async (req, res) => {
    var user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
    });
    try {
        await user.save();
        res.json({ status: "success", user });
    } catch (err) {
        res.json({ status: "failed", err });
    }
}