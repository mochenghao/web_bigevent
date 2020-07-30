$(function () {
    initUserInfo();
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });

    $('#info_form').submit(function (e) {
        // 阻止默认跳转
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                // 重新渲染头像
                window.parent.getUserInfo();
            }
        })
    });
    // 点击重置按钮
    $('#regBtn').on('click', function (e) {
        // 阻止默认跳转
        e.preventDefault();
        initUserInfo();
    });
});

var form = layui.form;
var layer = layui.layer;
// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            form.val('formUserInfo', res.data);
        }
    })
}