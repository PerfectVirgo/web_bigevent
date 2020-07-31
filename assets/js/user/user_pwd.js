$(function () {

    // 定义密码、新密码、确认新密码验证规则
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name="oldPwd"]').val()) {
                return '新旧密码不能相同！';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码不一致！';
            }
        }
    });

    // 修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                layui.layer.msg('更新密码成功，请成功登录', function () {
                    sessionStorage.removeItem('token');
                    window.parent.location.href = '/login.html';
                });
            }
        })
    });
})