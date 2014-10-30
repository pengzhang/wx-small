/**
 * Created by zp on 14-10-29.
 */
var http_helper = require('../util/http_helper.js')
var wx_url = require('../config/wx_request_url.js')
var access_token = require('./access_token_process.js')
var needle = require('needle');
var fs = require("fs")


function media_upload(file, file_type, callback) {
    var media_file_upload = wx_url.media_file_upload
    access_token.get_token(function (data) {
        media_file_upload = media_file_upload.replace('ACCESS_TOKEN', data)
        media_file_upload = media_file_upload.replace('TYPE', file_type)
        var data = {
                file: fs.createReadStream(file),
                content_type: 'image/jpeg'
        };

        console.log(data)
        needle
            .post(media_file_upload, fs.createReadStream(file),{ multipart: true }, function (err, resp, body) {
                console.log(err + resp + body)
            })
            .on('readable', function () {

            })
            .on('end', function () {
                console.log('Ready-o, friend-o.');
            })

    })


}

media_upload('/Users/zp/Downloads/08-030154_320.jpg', 'image')