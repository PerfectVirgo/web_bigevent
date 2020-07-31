$(function () {
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                layui.layer.msg(res.message);
                console.log(res);
                let htmlStr = template('tpl', res);
                $('.layui-card-body tbody').html(htmlStr);
            }
        })
    }
}) 