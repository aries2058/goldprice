let _flag_main_photo = false;
let _market = null;
$(function (){
    $('#user_id').val(_user.user_id)

    if($('#market_id').val() != ''){
        $.ajax({
            url: _host + '/market/getMarket',
            data: {id : $('#market_id').val() },
            success: function (res){
                console.log(res)
                _market = res;
                $('.market_nm').text(res.market_nm)
                $('#tel').val(res.tel);
                $('#addr').val(res.addr);
                $('#addr_detail').val(res.addr_detail);
                $('#contents').val(res.contents);
                $('#regdt').text(dateFormat(res.regdt, 'yyyy-MM-dd hh:mm:ss'))
                $('#moddt').text(dateFormat(res.moddt, 'yyyy-MM-dd hh:mm:ss'))
                $('.market_typ').val(res.market_typ)
                $('.itemtyp-area').show()
                let p = null;
                _.each($('.item_typ'), function (v, i){
                    if(res.item_typ.indexOf($(v).val())>-1){
                        p = $(v).parents('.lb-checkbox')
                        $('img', p).attr('src', $('img', p).attr('src').replace('off', 'on'));
                        $(v).prop('checked', true)
                    }
                })
                $('#link_homepage').val(res.link_homepage)
                $('#link_goldpen').val(res.link_goldpen)
                $('#link_kakao').val(res.link_kakao)
                $('#link_sns').val(res.link_sns)
                $('#hot_yn').val(res.hot_yn)
                $('#btn-main-photo').css('backgroundImage', 'url(' + _display + _user.image_path +')');

                if(res.image_ids != null && res.image_ids.length > 0){
                    let prms = [];
                    let p = null;
                    _.each(res.image_ids, function(v){
                        p = new Promise(function(resolve, reject){
                            $.ajax({
                                url: _host + '/func/getImagePath',
                                data: {id: v},
                                success: function (xres){
                                    let img = new Image();
                                    img.src = _display+xres;
                                    img.onload = function(e){
                                        let dataURL = draw(img);
                                        let tmp = _.template($('#tmpl-added-photos').html());
                                        $('.added-photos').append(tmp({data: dataURL, flag: true}))
                                        $('.photo>div').height($('.photo>div').width())
                                    }

                                }
                            })
                        })
                        prms.push(p)
                    })

                    Promise.all(prms).then(function(values){
                        if($('.photo').length < 3){
                            dispPhotoAddButton()
                        }
                    })
                }
                else{
                    dispPhotoAddButton()
                }
            }
        })
    }
    else {
        $('.market_nm').text(_user.biz_nm)
        dispPhotoAddButton()
    }

    // 대표사진 등록
    $('#btn-main-photo').click(function (){
        $('#file').click()
    })
    $('#file').change(function (){
        _flag_main_photo = true;
        let file = $('#file')[0].files[0];
        converterImage(file, function (dataURL){
            $('#hid-main-photo').val(dataURL);
            $('.main-photo').hide();
            $('#btn-main-photo').css('backgroundImage', 'url('+dataURL+')')

            modal.confirm('대표사진으로 등록하시겠습니까?', function(){
                $.ajax({
                    type: 'post',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    url: _host + '/func/uploadMarketMainImage',
                    data: new FormData($('#frm-file')[0]),
                    success: function(res){
                        registerMainPhoto(res)
                    }
                })
            })
        }, function(){
            modal.alert('대표사진 등록을 취소했습니다.');
            $('#btn-main-photo').css('backgroundImage', _host + '/images/icon_market.svg')
        })
    })

    $('#btn-register').click(function (){
        if(_flag_photos){
            uploadPhotos('market', register);
        }else{
            register();
        }
    })


})

function goPopup() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            console.log(data.buildingCode);


            $("#addr").val(fullRoadAddr);
            $("#building_code").val(data.buildingCode);

            /* document.getElementById('signUpUserPostNo').value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById('signUpUserCompanyAddress').value = fullRoadAddr;
            document.getElementById('signUpUserCompanyAddressDetail').value = data.jibunAddress; */
        }
    }).open();
}

function registerMainPhoto(image_path){
    $.ajax({
        type: 'post',
        url: _host + '/market/register',
        data: {
            id : $('#market_id').val(),
            market_nm : _user.biz_nm,
            biz_no: _user.biz_no,
            image_path: image_path,
        },
        success: function (res){
            modal.alert('대표사진이 등록되었습니다.');
            _user.image_path = image_path
            _user.market_id = res;
            setUserInfo(_user)
            $('#market_id').val(res)
        }
    })
}

let register = function(values){
    let item_typ = '';
    _.each($('.item_typ'), function(v){
        if($(v).is(':checked')){
            item_typ += $(v).val() + ',';
        }
    })
    $.ajax({
        type: 'post',
        url: _host + '/market/register',
        data: {
            id : $('#market_id').val(),
            market_nm : _user.biz_nm,
            biz_no: _user.biz_no,
            addr: $('#addr').val(),
            addr_detail: $('#addr_detail').val(),
            building_code: $('#building_code').val(),
            tel: $('#tel').val(),
            contents: $('#contents').val(),
            image_path: _user.image_path,
            map_id: _market == null ? 0: _market.map_id,
            writer: _user.user_id,
            image_ids: values,
            market_typ: $('.market_typ').val(),
            hot_yn: $('#hot_yn').val(),
            item_typ:item_typ.substr(0, item_typ.length-1),
            link_homepage: $('#link_homepage').val(),
            link_kakao: $('#link_kakao').val(),
            link_goldpen: $('#link_goldpen').val(),
            link_sns: $('#link_sns').val(),
        },
        success: function (res){
            _user.market_id = res;
            setUserInfo(_user);
            modal.alert('업체 정보가 등록되었습니다.', function (){
                opener.document.location.reload();
                self.close();
            })
        }
    })
}