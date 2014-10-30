/**
 * Created by zp on 14-10-29.
 */
var http = require('http');

function get(url, callback) {
    http.get(url, function (res) {
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