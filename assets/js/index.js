$(function () {
    // 页面加载调用函数
    getUserInfo();

    // 点击退出按钮：弹出提示框
    $('.loginOut').on('click', function () {
        layer.confirm('是否退出登录？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1、清空本地存储的token
            localStorage.removeItem('token');
            // 2、跳转回登录页面
            location.href = '../../login.html';
            layer.close(index);
        });
    });
});

var layer = layui.layer
// 定义获取用户信息函数
function getUserInfo() {
    // var layer = layui.layer
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 配置请求头：headers
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 请求成功：渲染头像
            renderAvatar(res.data);
        }
    });
};

// 定义函数渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎你&nbsp;&nbsp;' + name);
    // 如果用户没有头像，就渲染文本头像
    if (user.user_pic === null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    } else {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    };
};