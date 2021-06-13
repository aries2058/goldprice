var _host = '/jtoday'
var _user = null;

$(function(){
    if(_user == null){
        _user = JSON.parse(localStorage.getItem('profile'))
    }
    console.log(_user)
    dispSidebar();

    $('input[type=checkbox]').change(function(){
        let p = $(this).parents('.lb-checkbox')
        if($(this).is(':checked')){
            $('img', p).attr('src', $('img', p).attr('src').replace('off', 'on'));
        }else{
            $('img', p).attr('src', $('img', p).attr('src').replace('on', 'off'));
        }
    })
})

function dispSidebar(){
    $('.sidebar, .back').height($(window).height())
    $('.btn-open-sidebar').on('click', ()=>{
        $('.biznm').text(_user.biz_nm)
        $('.back').show();
        $('.sidebar').animate({
            right:0
        })
        if(!$('.sidebar #btn-main-photo').hasClass('on') && _user.image_id !=null){
            $.ajax({
                url: _host + '/func/getImage',
                data: {id: _user.image_id},
                success: function (res){
                    $('#btn-main-photo').addClass('on')
                    $('#btn-main-photo').css('backgroundImage', 'url('+res+')');
                }
            })
        }
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
        location.href = _host + '/market/write?id=' + (_user.market_id);
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
