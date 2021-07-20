$(function (){
    let pattern1 = /[0-9]/;
    let pattern2 = /[a-zA-Z]/;
    let pattern3 = /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거
    $('#password').keydown(function(){
        let pw = $(this).val()
        if(!pattern1.test(pw)||!pattern2.test(pw)||!pattern3.test(pw)||pw.length<8||pw.length>50){
            $('#msg-password').html('영문,숫자,특수기호 8자리 이상으로 구성하여야 합니다.');
        }
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

    $('#btn-register').click(function (){
        $.ajax({
            type: 'post',
            url: _host + '/auth/updatePassword',
            data: {
                userid : _user.user_id,
                password: $('#password').val()
            }, success : function(res){
                modal.alert("변경했습니다.")
            }
        })
    })
})