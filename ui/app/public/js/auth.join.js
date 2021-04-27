$(function(){

    // 사업자등록번호 체크
    $('#btn-check-bizno').click(function(){
        if($('#biz_no').val() != '' && checkBizno($('#biz_no').val())){
            $.ajax({
                url: 'http://mnisdh.synology.me:7070/goldprice/api/auth/checkBizNo',
                data: {
                    bizno : $('#biz_no').val()
                },
                success: function(res){
                    if(res.length == 0){
                        goStep1();
                    }else {
                        $('#btn-check-bizno').hide();
                        var html = '<p>이미 가입된 정보가 있습니다.</p>';
                        _.each(res, function(v){
                            html += '<p><b>'+v.user_id+'</b>';
                            if(v.confirm_yn == null){
                                html += ' (가입승인중)'
                            }
                            html += '</p>';
                        })
                        html += '<a class="btn btn-primary">로그인</a> <a class="btn btn-primary" onclick="goStep1()">계속하기</a>';
                        $('.result').html(html)
                    }
                }
            })
        }else{
            alert('사업자등록번호가 아닙니다.')
        }
    })

    // 아이디 중복확인
    $('#btn-check-userid').click(function(){
        if($('#user_id').val() != ''){
            $.ajax({
                url: 'http://mnisdh.synology.me:7070/goldprice/api/auth/getMember',
                data: {
                    userid : $('#user_id').val()
                },
                success: function(res){
                    if(res.user_id != null){
                        alert('중복 된 아이디입니다.')
                    }else {
                        alert('사용하실 수 있는 아이디입니다.')
                        $('#user_id').attr('readonly', true)
                        $('#check-userid').val('Y');
                    }
                }
            })
        }else{
            alert('아이디를 입력하세요.')
        }
    })

    // 가입유형 선택
    $('.btn-typ').click(function(){
        $('#user_typ').val($(this).data('val'))

        $('.info').show();
        if($(this).hasClass('biz')){
            $('.info .other').hide()
            $('.info .biz').show()
        }else{
            $('.info .biz').hide()
            $('.info .other').show()
        }
    })

    // 아이디 입력 시
    $('#user_id').keydown(function(){
        $('#check-userid').val('N')
    });

    // 비밀번호 입력 시
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
})

function checkBizno(bizno)
{
    // 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인합니다.
    if ((bizno = (bizno+'').match(/\d{1}/g)).length != 10) { return false; }
    // 합 / 체크키
    var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    // 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에더합니다.
    for (var i = 0 ; i < 9 ; i++) { sum += (key[i] * Number(bizno[i])); }
    // 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
    // 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
    return (10 - ((sum + Math.floor(key[8] * Number(bizno[8]) / 10)) % 10)) == Number(bizno[9]);
}

function goStep1(){
    $('#disp-bizno').val($('#biz_no').val())

    $('.step.on').removeClass('on')
    $('#step1').addClass('on')
}
function goStep2(){
    $('.step.on').removeClass('on')
    $('#step2').addClass('on')
}
function goStep3(){
    if($('#biz_nm').val() == ''){
        alert('사업장 이름을 입력하세요.')
    }else if($('#user_nm').val() == ''){
        alert('사용자 이름을 입력하세요.')
    }else if($('#tel').val() == ''){
        alert('사업장 전화번호를 입력하세요.')
    }else if($('#img1').val() == ''){
        alert('사업자등록증을 입력하세요.')
    }else if($('#img2').val() == ''){
        alert('매장사진을 입력하세요')
    }else if(($('#user_typ').val() == 'SALES' || $('#user_typ').val() == 'ETC') && $('#img3').val() == ''){
        alert('명함사진을 입력하세요')
    }else{
        $('.step.on').removeClass('on')
        $('#step3').addClass('on')
    }
}
function goStep4(){
    if($('#check-userid').val() != 'Y'){
        alert('아이디 중복확인을 하세요.');
    }else if($('#password').val() == '' ||  $('#msg-password').html() != ''){
        alert('비밀번호를 입력하세요.')
    }else{
        var formData = new FormData();
        formData.append("uploadFiles", $('#img1')[0].files[0]);
        formData.append("uploadFiles", $('#img2')[0].files[0]);
        formData.append("uploadFiles", $('#img3')[0].files[0]);
    
        $.ajax({
            url: 'http://mnisdh.synology.me:7070/goldprice/api/uploadFile',
            processData: false,
            contentType: false,
            data: formData,
            type: 'POST',
            dataType: 'json',
            success: function(res){
                console.log(res)
                $('#fileDtoList').val(res)
                $.ajax({
                    url: 'http://mnisdh.synology.me:7070/goldprice/api/auth/register',
                    data: $('#form').serialize(),            
                    dataType : 'json',
                    type: 'post',
                    success: function(res2){
                        console.log(res2)
                        $('.step.on').removeClass('on')
                        $('#step4').addClass('on')
                    }
                })
            }
        })
    
    }
}