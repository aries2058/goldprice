$(function(){
    dispPhotoAddButton()

    $('#writer').val(_user.user_id)

    $('#btn-back').click(function (){
        history.back()
    })

    $('#btn-submit').click(function (){
        modal.confirm('등록하시겠습니까?', function(values){
            $('#image_ids').val(values)
            uploadBoardPhotos(function(values){
                console.log(values)
                $('#image_ids').val(values)
                $.ajax({
                    type:'post',
                    url: _host + '/board/register',
                    data: $('#frm').serialize(),
                    success: function (res){
                        modal.alert('등록하였습니다.');
                        location.href = _host + '/board/list?typ='+$('#board_typ').val()
                        window.open(_host + '/board/detail?typ='+$('#board_typ').val()+'&id=' + res)
                    }
                })
            })
        })
    })
})