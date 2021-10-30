let imgHtml = '';

// $(window).scroll(function() {
//     if($(window).scrollTop() + $(window).height() == $(document).height()) {
//         if($('#text-comment').attr('rows') == 1){
//             $('#text-comment').attr('rows', 4)
//         }
//     }else{
//         $('#text-comment').attr('rows', 1)
//     }
// });

$(function () {
    $('#btn-board-menu').click(function (){
        if($('#board-menu').hasClass('on')){
            $('#board-menu').removeClass('on')
        }else{
            $('#board-menu').addClass('on')
        }
    })
    $('#btn-edit').click(function (){
        window.open(_host + "/board/write?id="+$('#bid').val())
    })
    $('#btn-del').click(function (){
        modal.confirm('정말 삭제하시겠습니까?', function (){
            $.ajax({
                url: _host + '/board/deleteBoard',
                data: {id : $('#bid').val()},
                success: function (){
                    opener.parent.location.reload();
                    self.close();
                }
            })
        })
    })
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
            if(res.writer_photo != null)
            $('#writer-photo').attr('src', _display + res.writer_photo);

            if(res.writer == _user.user_id){
                $('#btn-board-menu').show();
            }

            if(res.image_ids.length > 0){
                _.each(res.image_ids, function(v){
                    $.ajax({
                        url: _host + '/func/getImagePath',
                        data: {id: v},
                        success: function (res){
                            imgHtml += '<img class="img-fluid mb-1 mt-1" src="'+_display +res+'" />'
                        }
                    })
                })

            }
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
                    $('#text-comment').val('')
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