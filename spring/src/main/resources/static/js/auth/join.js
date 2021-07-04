var arrIds = [];

$(function(){
    if($('#step2').hasClass('on')){
        $('#user_id').prop('readonly', true)
        $('#btn-submit').text('수정')
        $('#btn-check-userid').hide();
    }

    // 뒤로가기 버튼
    $('#btn-back').click(function(){
        if($('#step3').hasClass('on')){
            $('#step3').removeClass('on')
            $('#step2').addClass('on')
        }else if($('#step1').hasClass('on')){
            $('#step1').removeClass('on')
            $('#step0').addClass('on')
        }else if($('#step2').hasClass('on')){
            $('#step2').removeClass('on')
            $('#step0').addClass('on')
        }else if($('#step0').hasClass('on')){
             history.back();
         }
    })

    // 사업자등록번호 체크
    $('#btn-check-bizno').click(function(){
        // if($('#biz_no').val() != '' && checkBizno($('#biz_no').val())){ // 사업자등록번호 유효성 체크
        if($('#biz_no').val() != ''){
            $.ajax({
                url: _host + '/auth/checkBizNo',
                data: {
                    bizno : $('#biz_no').val()
                },
                success: function(res){
                    console.log(res)
                    if(res.length == 0){
                        goStep1();
                    }else {
                        $('#btn-check-bizno').hide();
                        var tmp = _.template($('#tmpl-result').html())
                        $('.result').html(tmp({data: res}))
                        $('.result').show()
                        $('#btn-login').click(function (){
                            location.href= _host + '/auth/login'
                        })
                        $('#biz_nm').val(res[0].biz_nm)
                        $('#tel').val(res[0].tel)
                    }
                }
            })
        }else{
            modal.alert('사업자등록번호가 아닙니다.')
        }
    })

    // 아이디 중복확인
    $('#user_id').keyup(function(){
        $('#check-userid').val('N');
    })
    $('#btn-check-userid').click(function(){
        if($('#user_id').val() != ''){
            $.ajax({
                url: _host + '/auth/getMember',
                data: {
                    userid : $('#user_id').val()
                },
                success: function(res){
                    if(res.user_id != null){
                        modal.alert('중복 된 아이디입니다.')
                    }else {
                        modal.alert('사용하실 수 있는 아이디입니다.')
                        $('#check-userid').val('Y');
                    }
                }
            })
        }else{
            modal.alert('아이디를 입력하세요.')
        }
    })

    // 가입유형 선택
    $('.btn-typ').click(function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on')
        }else{
            $(this).addClass('on')
        }
        $('#user_typ').val('')
        $('.info .biz, .info .other').hide()
        $('.info .biz, .info .other').removeClass('on')

        if($('.btn-typ.on').length > 0){
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

    let pattern1 = /[0-9]/;
    let pattern2 = /[a-zA-Z]/;
    let pattern3 = /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거
    // 비밀번호 입력 시
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

     imageConverter($('#img1'), 'canvas1', 'dispImg1');
     imageConverter($('#img2'), 'canvas2', 'dispImg2');
     imageConverter($('#img3'), 'canvas3', 'dispImg3');
})

function getUserInfo(){
     $.ajax({
         url: _host + '/auth/getMember',
         data: {userid : $('#user_id').val() },
         success: function(res){
             console.log(res)
             $('#step2 .info').show()
             $('#biz_no').val(res.biz_no)
             $('#disp-bizno').val(res.biz_no)
             $('#biz_nm').val(res.biz_nm);
             $('#user_nm').val(res.user_nm);
             $('#tel').val(res.tel);
             $('#mobile').val(res.mobile);
             $('#email').val(res.email);
             var strtyp = '';
             _.each(res.roleSet, function(v){
                 strtyp += v + ','
                 $('.btn-typ[data-val='+v+']').addClass('on')
                 $('.btn-typ[data-val='+v+']').addClass('btn-gold')
                 if($('.btn-typ[data-val='+v+']').hasClass('biz')){
                     $('.info .biz').show()
                     $('.info .biz').addClass('on')
                 }
                 if($('.btn-typ[data-val='+v+']').hasClass('other')){
                     $('.info .other').show()
                     $('.info .other').addClass('on')
                 }
             })
             if(strtyp != ''){
                 $('#user_typ').val(strtyp.substr(0, strtyp.length - 1))
             }
             _.each(res.fileDtoList, function(v, i){
                 var src = _dispurl +v.filePath;
                 $('#img-area').append("<img src='"+src+"' class='dispImg' />")
             })
         }
     })
}

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
        modal.alert('사업장 이름을 입력하세요.')
    }else if($('#user_nm').val() == ''){
        modal.alert('사용자 이름을 입력하세요.')
    }else if($('#tel').val() == ''){
        modal.alert('사업장 전화번호를 입력하세요.')
    }else if($('#email').val() == ''){
        modal.alert('이메일주소를 입력하세요.')
    }else if($('#tel').val().length < 8){
        modal.alert('사업장 전화번호를 다시 확인하세요.')
    }else if($('#update_yn').val() == 'N' && $('#img1').val() == ''){
        modal.alert('사업자등록증을 입력하세요.')
    }else if($('#update_yn').val() == 'N' && $('div.biz').hasClass('on') && $('#img2').val() == ''){
        modal.alert('매장사진을 입력하세요')
    }else if($('#update_yn').val() == 'N' && $('div.other').hasClass('on') && $('#img3').val() == ''){
        modal.alert('명함사진을 입력하세요')
    }else{
        $('.step.on').removeClass('on')
        $('#step3').addClass('on')
    }
}
function goStep4(){
    if($('#update_yn').val() == 'N' && $('#check-userid').val() != 'Y'){
        modal.alert('아이디 중복확인을 하세요.');
    }else if($('#password').val() == '' ||  $('#msg-password').html() != ''){
        modal.alert('비밀번호를 입력하세요.')
    }else{
        let prms = [];
        let p = null;
        if($('#dispImg1').attr('src') != null){
            p = new Promise(function(resolve, reject){
                uploadImage($('#dispImg1').attr('src'), resolve)
            })
            prms.push(p)
        }
        if($('#dispImg2').attr('src') != null){
           p = new Promise(function(resolve, reject){
               uploadImage($('#dispImg2').attr('src'), resolve)
           })
           prms.push(p)
        }
        if($('#dispImg3').attr('src') != null){
           p = new Promise(function(resolve, reject){
               uploadImage($('#dispImg3').attr('src'), resolve)
           })
           prms.push(p)
        }

        Promise.all(prms).then(function(values){
            $('#images').val(values)
            $.ajax({
                url: _host + '/auth/register',
                data: $('#form').serialize(),
                type: 'post',
                success: function(res){
                    $('.top-bar').hide();
                    $('.step.on').removeClass('on')
                    $('#step4').addClass('on')
                }
            })
        })




//        var cv = '';
//        if($('#img1').val()!=''){
//            cv += 'canvas1,'
//        }
//        if($('#img2').val()!=''){
//            cv += 'canvas2,'
//        }
//        if($('#img3').val()!=''){
//            cv += 'canvas3,'
//        }
//        if(cv == ''){
//            $.ajax({
//                url: _host + '/auth/register',
//                data: $('#form').serialize(),
//                type: 'post',
//                success: function(res2){
//                    $('.step.on').removeClass('on')
//                    $('#step4').addClass('on')
//                }
//            })
//        }else{
//            cv = cv.substr(0, cv.length - 1)
//            $.ajax({
//                url: _host + '/uploadFile',
//                processData: false,
//                contentType: false,
//                data: imageFormData(cv),
//                type: 'POST',
//                dataType: 'json',
//                success: function(res){
//                    $('#fileDtoList').val(res)
//                    $.ajax({
//                        url: _host + '/auth/register',
//                        data: $('#form').serialize(),
//                        type: 'post',
//                        success: function(res2){
//                            $('.step.on').removeClass('on')
//                            $('#step4').addClass('on')
//                        }
//                    })
//                }
//            })
//        }
    }
}



function imageFormData(canvas){
    var formData = new FormData();
    var arr = canvas.split(',')
    _.each(arr, function(v, i){
        const canvas = document.getElementById(v);
        const imgBase64 = canvas.toDataURL('image/jpeg', 'image/octet-stream');
        const decodImg = atob(imgBase64.split(',')[1]);
        let array = [];
        for (let i = 0; i < decodImg .length; i++) {
            array.push(decodImg .charCodeAt(i));
        }

        const file = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
        const fileName = 'canvas_img_' + new Date().getMilliseconds() + '.jpg';
        formData.append("uploadFiles", file, fileName);
    })
    return formData
}

function imageConverter($file, canvas_id, img_id){
    $file.change(function(){
        var file = $file[0].files[0];

        // 파일을 읽을 수 있는 File Reader 를 생성합니다
        var reader = new FileReader();
        reader.readAsDataURL(file);

        // 파일이 읽혀지면 아래 함수가 실행됩니다
        reader.onload = function(ev) {
            var img = new Image();
            img.src = ev.target.result;

            img.onload = function(e){
                // HTML5 canvas 객체를 생성합니다
                var canvas = document.getElementById(canvas_id);
                var ctx = canvas.getContext("2d");
                // 캔버스에 업로드된 이미지를 그려줍니다
                ctx.drawImage(img, 0, 0);

                // 최대폭을 400 으로 정했다고 가정했을때
                // 최대폭을 넘어가는 경우 canvas 크기를 변경해 줍니다.
                var MAX_WIDTH = 1024;
                var MAX_HEIGHT = 1024;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                }
                else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;

                // canvas에 변경된 크기의 이미지를 다시 그려줍니다.
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                // canvas 에 있는 이미지를 img 태그로 넣어줍니다
                var dataURL = canvas.toDataURL("image/png");
                document.getElementById(img_id).src = dataURL;
            }
        }
    })
}
