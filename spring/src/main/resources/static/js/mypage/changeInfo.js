$(function (){
    $('#user_nm').val(_user.user_nm)
    $('#tel').val(_user.tel)
    $('#mobile').val(_user.mobile)
    $('#email').val(_user.email)

    $('#btn-back').click(function (){
        window.history.back()
    })
    $('#btn-register').click(function (){
        $.ajax({
            type: 'post',
            url: _host + '/auth/update',
            data: {
                user_id : _user.user_id,
                tel : $('#tel').val(),
                mobile : $('#mobile').val(),
                email : $('#email').val(),
            }, success : function(res){
                _user.tel = $('#tel').val();
                _user.mobile = $('#mobile').val();
                _user.email = $('#email').val();
                let info = _user;
                localStorage.setItem('profile', JSON.stringify(info))
                modal.alert("변경했습니다.")
            }
        })
    })
})