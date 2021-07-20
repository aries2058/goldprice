let _host = '/jtoday'
let _display = 'http://mnisdh.synology.me:7070/jtoday/func/display?fileName=';
let _user = null;

$(function(){
    if(_user == null){
        _user = JSON.parse(localStorage.getItem('profile'))
    }
    console.log(_user)
    dispSidebar();

    if($('.top-bar-title').length > 0){
        $('.top-bar-title').prependTo($('.top-bar'))
    }

    $('input[type=checkbox]').change(function(){
        let p = $(this).parents('.lb-checkbox')
        if(p.length > 0){
            if($(this).is(':checked')){
                $('img', p).attr('src', $('img', p).attr('src').replace('off', 'on'));
            }else{
                $('img', p).attr('src', $('img', p).attr('src').replace('on', 'off'));
            }
        }
    })

    if(window.android != undefined){
        window.android.checkCameraPermission()
        let push = getPush();
        if(localStorage.getItem('push') == null){
            window.android.getToken()
        }
    }

    //테스트용 나중에 지워
    // if(localStorage.getItem('push') == null){
    //     setPush({token: 'eqbVsPG-QXmGwpPTuE09k3:APA91bExmZt1FbBADjvooWNUYo87PVC-bYda5ySDaDVCnMft_8pOHN9xDh2hwAlmL3QZKHKQDhtRmqKHVkEBRMDozWo1uW1oYOBwAuLoO4a_lnE3bVexMI_IJ9sykqjmuuf4IrwgMXFz', typ: 'fcm', uuid: null, id: null})
    // }
})

function pushToken(token, typ){
    alert(token)
    setPush({token: token, typ: typ, uuid: null, id: null})
}

function getPush(){
    return JSON.parse(localStorage.getItem('push'))
}
function setPush(push){
    localStorage.setItem('push', JSON.stringify(push))
}



function dispSidebar(){
    $('.sidebar, .back').height($(window).height())
    $('.btn-open-sidebar').on('click', ()=>{
        $('.usernm').text(_user.user_nm + " 님")
        $('.biznm').text(_user.biz_nm)
        $('.back').show();
        $('.sidebar').animate({
            right:0
        })
        $('#btn-main-photo').css('backgroundImage', 'url(' + _display + _user.image_path +')');
    })
    $('.btn-close-sidebar').on('click', ()=>{
        $('.back').hide();
        $('.sidebar').animate({
            right:"-75%"
        })
    })
    $('.back').on('click', function(){
        $('.back').hide();
        $('.sidebar').animate({
            right:"-75%"
        })
    })

    $('#btn-update-userinfo').click(function(){
        window.open(_host + '/market/write?id=' + (_user.market_id))
    })
    $('.sidebar .list-group-item a').click(function(){
        if($(this).data('url')){
            window.open(_host + $(this).data('url'))
        }
    })
}

function comma(obj) {
    var regx = new RegExp(/(-?\d+)(\d{3})/);
	var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
	var strArr = obj.split('.');
	while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
		//정수 부분에만 콤마 달기
		strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
	}
	if (bExists > -1) {
		//. 소수점 문자열이 발견되지 않을 경우 -1 반환
		obj = strArr[0] + "." + strArr[1];
	} else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환
		obj = strArr[0];
	}
	return obj;//문자열 반환
}
function telnum(obj){
    if(obj!='' && obj!=null){
        var len = obj.length;
        var n1='', n2='', n3='';
        if(len == 8){
            return obj.substr(0,4) + '-' + obj.substr(4,4)
        }else {
            n1 = obj.substr(0,2) == '02' ? '02' : obj.substr(0,3);
            n3 = obj.substr(len-4, 4);
            n2 = obj.replace(n1, '');
            n2 = n2.replace(n3, '');
            return n1 + '-' + n2 + '-' + n3;
        }
    }else{
        return ' - ';
    }
}
function biznum(obj){
    if(obj!='' && obj!=null){
        return obj.substr(0,3) + '-' + obj.substr(3, 2) + '-' + obj.substr(5,5);
    }else{
        return '';
    }
}

function uploadImage(imageString, resolve){
    $.ajax({
        type: 'post',
        url: _host + '/func/uploadImage',
        data: {
            imageString : imageString
        },
        success: function(res){
            console.log('uploadImage: ' + res)
            resolve(res)
        },
        error: function (a,b,c){
            console.log(a,b,c)
        }
    })
}

function dateFormat(d, format){
    if(format == 'yyyy-MM-dd'){
        return d.substr(0, 10);
    }else if(format == 'yyyy-MM-dd hh:mm:ss'){
        return d.substr(0, 10) + ' ' + d.substr(11, 8);
    }
}


function role(r){
    if(r == "RETAIL"){
        return "소매"
    }else if(r == "SOLE"){
        return "도매"
    }else if(r == "WHOLE"){
        return "총판"
    }else if(r == "FACTORY"){
        return "공장"
    }else if(r == "SALES"){
        return "영업사원"
    }else if(r == "ETC"){
        return "기타"
    }else{
        return "관리자"
    }
}


function itemtyp(items){
    let ret = [];
    _.each(items.split(','), function (v){
        if(v == "01") {
            ret.push("순금")
        }else if(v == "02") {
            ret.push("웨딩")
        }else if(v == "03") {
            ret.push("패션")
        }else if(v == "04") {
            ret.push("귀걸이")
        }else if(v == "05") {
            ret.push("체인")
        }else if(v == "06") {
            ret.push("커플링")
        }else if(v == "07") {
            ret.push("진주/유색")
        }else if(v == "08") {
            ret.push("레이저각인/땜")
        }else if(v == "09") {
            ret.push("도금")
        }
    })
    return ret;
}

let modal = {
    alert : function (msg){
        $('.modal-alert .modal-body').html(msg)
        $('.back, .modal-alert').show();
    },

    confirm : function (msg, trueCallback, falseCallback){
        $('.modal-confirm .modal-body').html(msg)
        $('.back, .modal-confirm').show();

        $('.btn-confirm-yes').off('click');
        $('.btn-confirm-yes').on('click', function (){
            trueCallback();
            $('.modal').hide()
            $('.back').hide()
        });

        if(falseCallback != null){
            $('.btn-confirm-no').off('click');
            $('.btn-confirm-no').on('click', function (){
                falseCallback();
                $('.modal').hide()
                $('.back').hide()
            });
        }
    }
}

$(document).on('click', '.btn-alert-ok, .modal .close', function (){
    $('.modal').hide()
    $('.back').hide()
});