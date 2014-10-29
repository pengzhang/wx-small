/**
 * Created by zp on 14-10-29.
 */


var wx_url = require("../config/wx_request_url.js")
var wx_secrect = require("../config/wx_secrect.js")
var https_client = require("../util/https_client.js")
var file_util = require("../util/file_util.js")

var access_token_file = "../config/access_token";

function get_token(callback) {

    file_util.read(access_token_file, function (err,data) {
        if (err) {
            refresh_token(function (data) {
                callback(data);
            })
        } else {
            if (data.isEmpty || data == "") {
                refresh_token(function (data) {
                    callback(data);
                })
            } else {
                callback(data);
            }
        }
    })
}


function refresh_token(callback) {

    https_client.get(get_access_token_url(), function (data) {
        file_util.write(access_token_file, data);
        callback(data);
    })
}


function get_access_token_url() {
    var access_token_url = wx_url.access_token_url;
    access_token_url = access_token_url.replace("APPID", wx_secrect.app_id);
    access_token_url = access_token_url.replace("APPSECRET", wx_secrect.app_secret);
    return access_token_url;
}


get_token(function(data){
    console.log(data)
})
