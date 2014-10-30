/**
 * Created by zp on 14-10-29.
 */
var fs = require('fs');

function write(file, data) {
    fs.writeFile(file, data, {encoding: 'utf-8', flag: 'w'}, function (err) {
        if (err) {
            console.log('file write error:' + err);
        }
    });
}

function read(file, callback) {
    fs.readFile(file, {encoding: 'utf-8', flag: 'r'}, function (err, data) {
        callback(err, data);
    });
}
exports.write = write
exports.read = read


