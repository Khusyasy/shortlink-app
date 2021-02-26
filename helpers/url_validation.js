var URL = require('url').URL;

function URLisValid(s) {
    try {
        s = new URL(s);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = URLisValid;