let imgHtml = '';
$(function () {
    $.ajax({
        url: _host + '/board/getBoard',
        data: {id : $('#bid').val()},
        success: function (res){
            $('#title').text(res.title)
            $('#contents').text(res.contents)
            $('#biznm').text(res.biz_nm)
            $('#usernm').text(res.user_nm)
            $('#userid').text(res.writer)
            $('#moddt').text(dateFormat(res.moddt, 'yyyy-MM-dd hh:mm:ss'))
            $('#comment-cnt').text(res.cmt_cnt);

            if(res.image_ids.length > 0){
                _.each(res.image_ids, function(v){
                    $.ajax({
                        url: _host + '/func/getImage',
                        data: {id: v},
                        success: function (res){
                            imgHtml += '<img class="img-fluid mb-1 mt-1" src="'+res+'" />'
                        }
                    })
                })

            }
        }
    })
    getComments();

    $('#text-comment').click(function(){
        if($(this).attr('rows') == 1){
            $(this).attr('rows', 4)
        }
    })
    $('#text-comment').focusout(function(){
        $('#text-comment').attr('rows', 1)
    })

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

$(document).ajaxStop(function () {
    $('.b-photo').html(imgHtml)
});

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