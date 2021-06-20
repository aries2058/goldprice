$(function (){
    $('#password').keydown(function(){
        if($('#confirm-password').val() != ''){
            $('#confirm-password').val('')
            $('#msg-password').html('')
        }
    });
    $('#confirm-password').keyup(function(){
        if($(this).val() != $('#password').val()){
            $('#msg-password').html('비밀번호가 일치하지 않습니다.')
        }else{
            $('#msg-password').html('')
        }
    });

    $('#btn-back').click(function (){
        window.history.back()
    })
    $('#btn-register').click(function (){
        $.ajax({
            type: 'post',
            url: _host + '/auth/updatePassword',
            data: {
                userid : _user.user_id,
                password: $('#password').val()
            }, success : function(res){
                alert("변경했습니다.")
            }
        })
    })
})