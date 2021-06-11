$(function(){
    $('#btn-findid').click(function(){
        if($('#email').val() == ''){
            alert('이메일주소를 입력하세요.')
        }else if($('#mobile').val() == ''){
            alert('핸드폰번호를 입력하세요.')
        }else{
            $.ajax({
                type: 'post',
                url: _host + '/auth/findIdPw',
                data: {
                    email: $('#email').val(),
                    mobile: $('#mobile').val()
                },
                success: function(res){
                    if(res!=''){
                        const arr = res.split(',');
                        const tmp = _.template($('#tmpl-mail').html());
                        const message = tmp({id: arr[0], pw: arr[1]});

                        $.ajax({
                            type: 'post',
                            url: _host + '/func/mail',
                            data: {
                                title: '[종로투데이] 귀하의 계정정보입니다.',
                                message: message,
                                address: $('#email').val()
                            },
                            success: function(xres){
                                $('.alert').show();
                            }
                        })
                    }else{
                        alert("정보가 일치하는 계정이 없습니다.")
                    }
                }
            })
        }
    })
})