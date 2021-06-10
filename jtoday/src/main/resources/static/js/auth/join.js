$(function(){
    if($('#step2').hasClass('on')){
        $('#user_id').prop('readonly', true)
        $('#btn-submit').text('수정')
        $('#btn-check-userid').hide();
        // $.ajax({
        //     url: '/auth/getMember',
        //     data: {userid : $('#user_id').val() },
        //     success: function(res){
        //         console.log(res)
        //         $('#step2 .info').show()
        //         $('#biz_no').val(res.biz_no)
        //         $('#disp-bizno').val(res.biz_no)
        //         $('#biz_nm').val(res.biz_nm);
        //         $('#user_nm').val(res.user_nm);
        //         $('#tel').val(res.tel);
        //         $('#mobile').val(res.mobile);
        //         $('#email').val(res.email);
        //         var strtyp = '';
        //         _.each(res.roleSet, function(v){
        //             strtyp += v + ','
        //             $('.btn-typ[data-val='+v+']').addClass('on')
        //             $('.btn-typ[data-val='+v+']').addClass('btn-gold')
        //             if($('.btn-typ[data-val='+v+']').hasClass('biz')){
        //                 $('.info .biz').show()
        //                 $('.info .biz').addClass('on')
        //             }
        //             if($('.btn-typ[data-val='+v+']').hasClass('other')){
        //                 $('.info .other').show()
        //                 $('.info .other').addClass('on')
        //             }
        //         })
        //         if(strtyp != ''){
        //             $('#user_typ').val(strtyp.substr(0, strtyp.length - 1))
        //         }
        //         _.each(res.fileDtoList, function(v, i){
        //             var src = _dispurl +v.filePath;
        //             $('#img-area').append("<img src='"+src+"' class='dispImg' />")
        //         })
        //     }
        // })
    }


    // 사업자등록번호 체크
    $('#btn-check-bizno').click(function(){
        // if($('#biz_no').val() != '' && checkBizno($('#biz_no').val())){ // 사업자등록번호 유효성 체크
        if($('#biz_no').val() != ''){
            $.ajax({
                url: '/auth/checkBizNo',
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

                        $('#biz_nm').val(res[0].biz_nm)
                        $('#tel').val(res[0].tel)
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
                url: '/auth/getMember',
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
        if($(this).hasClass('btn-light')){
            $(this).removeClass('btn-light')
            $(this).addClass('btn-gold')
        }else{
            $(this).removeClass('btn-gold')
            $(this).addClass('btn-light')
        }

        $('#user_typ').val('')
        $('.info .biz, .info .other').hide()
        $('.info .biz, .info .other').removeClass('on')

        if($('.btn-typ.btn-gold').length > 0){
            $('.info').show();
            var typs = '';
            _.each($('.btn-typ.btn-gold'), function(v){
                typs += $(v).data('val') + ',';
                if($(v).hasClass('biz')){
                    $('.info .biz').show()
                    $('.info .biz').addClass('on')
                }
                if($(v).hasClass('other')){
                    $('.info .other').show()
                    $('.info .other').addClass('on')
                }
            })
            $('#user_typ').val(typs.substr(0, typs.length-1))
        }else{
            $('.info').hide();
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

    // imageConverter($('#img1'), 'canvas1', 'dispImg1');
    // imageConverter($('#img2'), 'canvas2', 'dispImg2');
    // imageConverter($('#img3'), 'canvas3', 'dispImg3');
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
    }else if($('#email').val() == ''){
        alert('이메일주소를 입력하세요.')
    }else if($('#tel').val().length < 8){
        alert('사업장 전화번호를 다시 확인하세요.')
    }else if($('#update_yn').val() == 'N' && $('#img1').val() == ''){
        alert('사업자등록증을 입력하세요.')
    }else if($('#update_yn').val() == 'N' && $('div.biz').hasClass('on') && $('#img2').val() == ''){
        alert('매장사진을 입력하세요')
    }else if($('#update_yn').val() == 'N' && $('div.other').hasClass('on') && $('#img3').val() == ''){
        alert('명함사진을 입력하세요')
    }else{
        $('.step.on').removeClass('on')
        $('#step3').addClass('on')
    }
}
function goStep4(){
    if($('#update_yn').val() == 'N' && $('#check-userid').val() != 'Y'){
        alert('아이디 중복확인을 하세요.');
    }else if($('#password').val() == '' ||  $('#msg-password').html() != ''){
        alert('비밀번호를 입력하세요.')
    }else{
        var cv = '';
        if($('#img1').val()!=''){
            cv += 'canvas1,'
        }
        if($('#img2').val()!=''){
            cv += 'canvas2,'
        }
        if($('#img3').val()!=''){
            cv += 'canvas3,'
        }
        if(cv == ''){
            $.ajax({
                url: '/auth/register',
                data: $('#form').serialize(),
                type: 'post',
                success: function(res2){
                    $('.step.on').removeClass('on')
                    $('#step4').addClass('on')
                }
            })
        }else{
            cv = cv.substr(0, cv.length - 1)
            $.ajax({
                url: '/uploadFile',
                processData: false,
                contentType: false,
                data: imageFormData(cv),
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    $('#fileDtoList').val(res)
                    $.ajax({
                        url: '/auth/register',
                        data: $('#form').serialize(),
                        type: 'post',
                        success: function(res2){
                            $('.step.on').removeClass('on')
                            $('#step4').addClass('on')
                        }
                    })
                }
            })
        }
    }
}