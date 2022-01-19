var _oldvalue = 0;
var _newvalue = '';

$(function(){
    $('.keypad').show();

    $('#btn-init').on('click', function (){
        location.reload();
    })

    $('.key').on('click', function(){
        $('.keypad').show();
        $('.key.on').removeClass('text-gold')
        $('.key.on').removeClass('on')
        $(this).addClass('on text-gold')
        _newvalue = '';
        _oldvalue = $(this).text();
    })
    /*
    $('.btn-close-keypad').on('click', function(){
        $('.keypad').hide();
        $('.key').removeClass('text-lightgray')
        _newvalue = '';
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
                if(_newvalue != '' && _newvalue.indexOf('.')<0){
                    _newvalue += $(this).text();
                }
                $('.key.on').html(comma(_newvalue))
            }else{
                if(_newvalue.length == 1 && _newvalue == 0){
                    _newvalue = '';
                }
                _newvalue += $(this).text();

                var $p = $('.key.on').parents(".row")
                var v = 0;
                if($('.key.on').hasClass('unit-g')){
                    v = _newvalue/3.75;
                    v = v % 1 > 0 ? v.toFixed(2) : Math.floor(v)
                    $('.unit-d', $p).text(v)
                }else{
                    v = _newvalue*3.75;
                    v = v % 1 > 0 ? v.toFixed(2) : Math.floor(v)
                    $('.unit-g', $p).text(v)
                }
                $('.key.on').html(comma(_newvalue))

                var p1 = parseFloat($('.key.unit-d').eq(0).text().replace(/,/g, ''))
                var p2 = parseFloat($('.key.unit-d').eq(1).text().replace(/,/g, ''))

                v = p1*0.572 + p2*0.737;
                v = v.toFixed(2)
                $('.price.unit-d').text(v)
                $('.price.unit-g').text((v*3.75).toFixed(2))
            }

            $('.key.on').removeClass('text-gold')
        }
    })
     */
})

function num(val){
    var str = val.replace(/,/g, '');
    if(str.indexOf('.')>0){
        return parseFloat(str);
    }else{
        return parseInt(str);
    }
}