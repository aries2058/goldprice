$(function () {
    $('#btn-close').click(function (){
        window.close();
    })
    $.ajax({
        url: _host + '/board/getBoard',
        data: {id : $('#bid').val()},
        success: function (res){
            $('#title').html(res.title)
            $('#contents').html(res.contents)
            $('#biznm').text(res.biz_nm)
            $('#usernm').text(res.user_nm)
            $('#userid').text(res.writer)
            $('#moddt').text(dateFormat(res.moddt, 'yyyy-MM-dd hh:mm:ss'))
            $('#comment-cnt').text(res.cmt_cnt)
        }
    })
    getComments();

    $('#btn-reply').click(function (){
        if($('#text-comment').val() == ''){
            modal.alert('내용을 입력하세요.')
        }else{
            $.ajax({
                type: 'post',
                url: _host + '/board/register',
                data: {
                    contents: $('#text-comment').val(),
                    pid: $('#bid').val(),
                    typ: $('#typ').val(),
                    writer: _user.user_id,
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
                $('.comment-list').show();
            }
        }
    })

}