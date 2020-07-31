$(function () {

    // 点击去注册账号切换到注册表单
    $('.log-box a').on('click', function () {
        $('.log-box').hide().siblings('.reg-box').show();
    });

    // 点击去登录切换到登录表单
    $('.reg-box a').on('click', function () {
        $('.reg-box').hide().siblings('.log-box').show();
    });

    // 定义密码框、确认密码框的验证规则
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            if (value !== $('.reg-box input[name="password"]').val()) {
                return '两次密码不一致！';
            }
        }
    });

    // 注册表单提交时发送Ajax请求
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        let username = $('.reg-box input[name="username"]').val();
        let password = $('.reg-box input[name="password"]').val();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $('#reg_form').serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                layui.layer.msg('注册成功，请登录！', function () {
                    $('.link a').click();
                    $('.log-box input[name="username"]').val(username);
                    $('.log-box input[name="password"]').val(password);
                });
            }
        });
    });

    // 登录表单提交时发送Ajax请求
    $('#log_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $('#log_form').serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                layui.layer.msg('登录成功！');
                sessionStorage.setItem('token', res.token);
                console.log(location.href);
                location.href = '../../index.html';
            }
        });
    });

})