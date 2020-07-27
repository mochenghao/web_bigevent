$(function () {
    // 点击 ling_reg按钮显示注册页面，隐藏登录页面
    $('.link_reg').on('click', function () {
        $('.register').show();
        $('.sign_in').hide();
    });
    // 点击 ling_sign按钮显示登录页面，隐藏注册页面
    $('.ling_sign').on('click', function () {
        $('.register').hide();
        $('.sign_in').show();
    });

    // 弹出提示框
    var layer = layui.layer;
    // 表单验证
    var form = layui.form;

    // 自定义表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        reg_pwd: function (value) {
            // 获取确认密码框的值
            var pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            };
        },
    });

    // form_reg注册表单监听提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认跳转
        e.preventDefault();
        // 发起ajax请求
        // $.ajax({
        //     type: 'POST',
        //     url: '/api/reguser',
        //     // 快速获取表单的值：serialize()
        //     data: $(this).serialize(),
        //     success: function (res) {
        //         if (res.status !== 0) {
        //             return layer.msg(res.message);
        //         }
        //         // 弹出提示，并跳转页面
        //         layer.msg(res.message, {
        //             time: 1000 // 1秒关闭弹框 
        //         }, function () {
        //             $('.ling_sign').click();
        //         });
        //     }
        // });
        $.post('/api/reguser', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 弹出提示，并跳转页面
            layer.msg(res.message, {
                time: 1000 // 1秒关闭弹框 
            }, function () {
                $('.ling_sign').click();
            });
        });
    });

    // form_sign登录表单监听提交事件
    $('#form_sign').on('submit', function (e) {
        // 阻止表单默认跳转
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 登陆成功的token返回值存储到本地
                localStorage.setItem('token', res.token);
                // 弹出提示，并跳转页面
                layer.msg(res.message, {
                    time: 1000 // 1秒关闭弹框 
                }, function () {
                    location.href = '../../index.html';
                });
            }
        });
    });
});