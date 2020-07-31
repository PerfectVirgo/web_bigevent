let user_info = null;

getUserInfo();

// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            user_info = res;
            renderAvatar();
        },
        async: false,   //同步  
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                sessionStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    });
}

// 渲染头像
function renderAvatar() {
    if (user_info.status !== 0) return;
    let name = user_info.data.nickname || user_info.data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user_info.data.user_pic) {
        $('.layui-nav-img').prop('src', user_info.data.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.text-avatar').html(name[0].toUpperCase()).show();
        $('.layui-nav-img').hide();
    }
}


$(function () {

    // jQuery的入口函数的执行时机
    renderAvatar();

    // 退出首页
    $('#logout_btn').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            sessionStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    });
})