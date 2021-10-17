
$(function(){
    $('.top-bar').eq(0).remove();

    $('#btn-login').click(function(){
        login()
    })
    $('#pw').keyup(function(e){
        if(e.keyCode == 13){
            login()
        }
    })

    $('#btn-findId').click(function(){
        window.open(_host + '/auth/findId')
    })
    $('#btn-join').click(function(){
        window.open(_host + '/auth/join')
    })
})

function login() {
    $.ajax({
        type: 'post',
        url: _host + '/auth/login',
        data: {
            userid: $('#userid').val(),
            pw: $('#pw').val()
        },
        success: function(res){
            console.log(res)
           if(res.token == null || res.token == ''){
               modal.alert('계정정보가 일치하지 않습니다.')
           }else{
               if(res.confirm_yn == 'W'){
                    location.href = _host + '/auth/join?userid=' + res.user_id
               }else if(res.confirm_yn == 'N'){
                   modal.alert('승인거절 계정입니다.')
               }else{
                    $.cookie('authkey', res.token, { expires: 7, path: '/' });
                    if($('#autologin').is(':checked')){
                        localStorage.setItem('autologin',$('#userid').val()+'|'+$('#pw').val())
                    }else{
                        localStorage.setItem('autologin', "N")
                    }
                    localStorage.setItem('profile', JSON.stringify(res))
                    location.href = _host + '/main/main'
               }
           }
        }
    })
}