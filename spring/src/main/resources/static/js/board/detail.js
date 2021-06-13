$(function () {
    $('#btn-list').click(function (){
        location.href = _host + '/board/list?typ='+ $('#typ').val()
    })
    $.ajax({
        url: _host + '/board/getBoard',
        data: {id : $('#bid').val()},
        success: function (res){
            $('#title').html(res.title)
            $('#contents').html(res.contents)
        }
    })
    getComments();

    $('#btn-reply').click(function (){
        if($('#text-comment').val() == ''){
            alert('내용을 입력하세요.')
        }else{
            $.ajax({
                type: 'post',
                url: _host + '/board/register',
                data: {
                    contents: $('#text-comment').val(),
                    pid: $('#bid').val(),
                    typ: $('#typ').val(),
                    writer: 'system',
                    cmt_cnt: parseInt($('#comment-cnt').text()) +1
                },
                success: function (res){
                    getComments();
                }
            })
        }
    })
})

function getComments(){
    $.ajax({
        url: _host + '/board/getComments',
        data: {id : $('#bid').val()},
        success: function (res){
            $('#comment-cnt').html(res.length)
            if(res.length > 0){
                var tmp = _.template($('#tmpl-list').html());
                $('#list').html(tmp({data: res}))
            }else {
                $('#list').html("<tr><td>댓글이 없습니다.</td></tr>")
            }
        }
    })

}