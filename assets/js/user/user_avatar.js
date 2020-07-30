$(function () {
    var layer = layui.layer
    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    };

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#fileBtn').on('click', function () {
        $('#file').click();
    });

    $('#file').on('change', function (e) {
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择要上传的照片')
        }
        // 获取用户选择的文件
        var file = e.target.files[0];
        // 将文件转换为路径
        var imgURL = URL.createObjectURL(file);
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 给确定按钮绑定事件
    $('#determineBtn').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 发起请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 调用父页面的方法重新获取用户信息，渲染头像
                window.parent.getUserInfo();
            },
        });
    });
});