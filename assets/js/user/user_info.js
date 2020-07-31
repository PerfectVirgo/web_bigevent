$(function () {

    // 定义昵称验证规则
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    });

    initUserInfo();
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败！');
                layui.form.val('formUserInfo', res.data);
            }
        })
    }

    // 重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });

    // 提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('更新用户信息失败！');
                layui.layer.msg('更新用户信息成功！');
                let userinfo = null;
                window.parent.getUserInfo();
            }
        })
    });
})