// 发送Ajax前按需拼接url和请求头
$.ajaxPrefilter(function (options) {
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: sessionStorage.getItem('token') || ''
        }
    }
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
});