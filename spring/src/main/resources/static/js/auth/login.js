
$(function(){
    $('#btn-login').click(function(){
        login()
    })
    $('#pw').keyup(function(e){
        if(e.keyCode == 13){
            login()
        }
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
                alert('계정정보가 일치하지 않습니다.')
           }else{
               if(res.confirm_yn == null){
                    location.href = _host + '/auth/join?userid=' + res.user_id
               }else if(res.confirm_yn == 'N'){
                    alert('승인거절 계정입니다.')
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