// 每次发起ajax请求之前执行的函数
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 如果请求url里面有 /my/ 字符，就设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '../../login.html'
        }
    }

});