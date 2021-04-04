var _oldvalue = 0;
var _newvalue = '';

$(function(){
    calc();

    $('#chk-stone').on('change', function(){
        if($(this).is(':checked')){
            $('.stone-form').addClass('on');
        }else{
            $('.stone-form').removeClass('on');
        }
        calc();
    })
    $('.key').on('click', function(){
        $('.keypad').show();
        $('.key.on').removeClass('on')
        $(this).addClass('on text-lightgray')
        _newvalue = '';
        _oldvalue = $(this).text();
    })
    $('.btn-close-keypad').on('click', function(){
        $('.keypad').hide();
        $('.key').removeClass('text-lightgray')
        _newvalue = '';
        calc();
    })
    $('.keypad td').on('click', function(){
        if($(this).hasClass('del')){
            if(_newvalue.length == 1){
                _newvalue = '';
                $('.key.on').html(_oldvalue)
                $('.key.on').addClass('text-lightgray')
            }else if(_newvalue.length > 1){
                _newvalue = _newvalue.substr(0, _newvalue.length-1)
                $('.key.on').html(comma(_newvalue))
            }
        }else{
            if($(this).text() == '.'){
                if(_newvalue != '' && _newvalue.indexOf('0')<0){
                    _newvalue += $(this).text();
                }
            }else{
                _newvalue += $(this).text();
            }
            $('.key.on').html(comma(_newvalue))
            $('.key.on').removeClass('text-lightgray')
        }
    })
    $('.btn-close-calc').on('click', function(){
        window.history.back();
    })
})

function calc(){
    var v1 = num($('.val-price').text()) / 3.75;
    var v2 = v1*0.6435*num($('.val-weight').text())+num($('.val-wage').text());
    var v3 = v1*1.3*0.825*num($('.val-weight').text())+num($('.val-wage').text());

    if($('#chk-stone').is(':checked')){
        v2 = v2 + (num($('.val-stone-cnt').text())*num($('.val-stone-price').text()))
        v3 = v3 + (num($('.val-stone-cnt').text())*num($('.val-stone-price').text()))
    }

    $('.p14k-t12').html(comma((v2*1.2).toFixed(2).toString()))
    $('.p14k-t14').html(comma((v2*1.4).toFixed(2).toString()))
    $('.p14k-t16').html(comma((v2*1.6).toFixed(2).toString()))
    $('.p14k-t18').html(comma((v2*1.8).toFixed(2).toString()))
    $('.p18k-t12').html(comma((v3*1.2).toFixed(2).toString()))
    $('.p18k-t14').html(comma((v3*1.4).toFixed(2).toString()))
    $('.p18k-t16').html(comma((v3*1.6).toFixed(2).toString()))
    $('.p18k-t18').html(comma((v3*1.8).toFixed(2).toString()))
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
function num(val){
    var str = val.replace(/,/g, '');
    if(str.indexOf('.')>0){
        return parseFloat(str);
    }else{
        return parseInt(str);
    }
}