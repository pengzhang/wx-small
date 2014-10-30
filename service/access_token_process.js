/**
 * Created by zp on 14-10-29.
 */


var wx_url = require('../config/wx_request_url.js')
var wx_secrect = require('../config/wx_secrect.js')
var file_util = require('../util/file_util.js')
var needle = require('needle');

var access_token_file = '../config/access_token';

function get_token(callback) {

    file_util.read(access_token_file, function (err, data) {
        if (err) {
            refresh_token(function (data) {
                callback(JSON.parse(data).access_token);
            })
        } else {
            if (data.isEmpty || data == '') {
                refresh_token(function (data) {
                    callback(JSON.parse(data).access_token);
                })
            } else {
                callback(JSON.parse(data).access_token);
            }
        }
    })

    //每2小时刷新Token
    var CronJob = require('cron').CronJob;
    new CronJob('* * */2 * * *', function(){
        refresh_token(function (data) {
            callback(JSON.parse(data).access_token);
        })
    }, null, true);

}


function refresh_token(callback) {

    needle.get(get_access_token_url(),{encoding:'utf-8'}, function (err,resp) {
        file_util.write(access_token_file, resp.body);
        callback(resp.body);
    },'utf-8')
}
refresh_token(function(data){
    console.log(data)
})

function get_access_token_url() {
    var access_token_url = wx_url.access_token_url;
    access_token_url = access_token_url.replace('APPID', wx_secrect.app_id);
    access_token_url = access_token_url.replace('APPSECRET', wx_secrect.app_secret);
    return access_token_url;
}

exports.get_token = get_token
exports.refresh_token = refresh_token