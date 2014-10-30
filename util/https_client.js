/**
 * Created by zp on 14-10-29.
 */

var https = require('https');

function get(url, callback) {
    https.get(url, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(data);
        });

    }).on('error', function (e) {
        console.log('error：' + e.message);
    });
}

exports.get = get