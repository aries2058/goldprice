$(function(){


    $.ajax({
        url: _host + '/price/getGold',
        success: function(res){
            _.each(res, function(v){
                var p = $('.price').eq(0);

                if(v.typ == 'S'){
                    p = $('.price').eq(1);
                }else if(v.typ == 'W'){
                    p = $('.price').eq(2);
                }

                $('.disp-vat', p).html(comma(v.vat + ''));
                $('.disp-sell', p).html(comma(v.sell + ''));
                $('.disp-buy', p).html(comma(v.buy + ''));
            })
        }
    })

    $('.btn-send').click(function() {
        $.ajax({
            url: _host + '/func/sendPush',
            data: { message: "teawradfasdfasdfasdfasdf"},
            success: function(res){
                console.log(res)
            }
        })

    })

    $('.btn-save').click(function(){
        var p = $(this).parents('.price')
        var typ = $(this).data('typ');
        $.ajax({
            type: 'post',
            url : _host + '/price/registerGold',
            data: {
                typ: typ,
                vat: $('.vat', p).val(),
                sell: $('.sell', p).val(),
                buy: $('.buy', p).val(),
            },
            success: function(res){
                if(res == "OK"){
                    $('.disp-vat', p).html($('.vat', p).val());
                    $('.disp-sell', p).html( $('.sell', p).val());
                    $('.disp-buy', p).html( $('.buy', p).val());

                    $('.vat', p).val(0);
                    $('.sell', p).val(0);
                    $('.buy', p).val(0);
                }
            }
        })
    })
})