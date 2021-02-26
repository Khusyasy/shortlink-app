var crypto = require('crypto');

function createShortID(s) {
    const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"];
    var hash = crypto.createHash('md5').update(s).digest("base64url");
    var res = [];

    var hashl = hash.length;
    var charsl = chars.length;
    for (var i = 0; i < hashl - 2; i += 3) {
        res.push(chars[(hash[i] + hash[i + 1] + hash[i + 2]) % charsl])
    }

    return res.join('');
}

module.exports = createShortID;