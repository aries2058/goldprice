let sttPage = 0;

$(function (){
    getList();
})

$(document).on('click', '.qna-item', function (){
    window.open(_host+'/board/detail?typ=02&id='+$(this).data('id'))
})

function getList(){
    $.ajax({
        url: _host + '/board/getList',
        data: {
            typ: '02',
            sttPage: sttPage,
            perPage: 50
        },
        success: function (res){
            console.log(res)
            var tmp = _.template($('#tmpl-qna').html());
            $('#list').html(tmp({data: res}))
        }
    })
}