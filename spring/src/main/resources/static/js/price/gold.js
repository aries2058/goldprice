let price_G = 0;
let price_S = 0;
$(function (){
    let tmp = _.template($('#tmpl-price').html())
    $.ajax({
        url: _host + '/price/getGold',
        data: {
            typ: 'G'
        },
        success: function(res){
            console.log(res)
            $('#dt-gold').html(dateFormat(res[0].regdt, 'yyyy-MM-dd')+' 기준');
            $('#price-gold').html(tmp({data: res[0], typ: 'G'}))
            price_G = res[0]
        }
    })

    $.ajax({
        url: _host + '/price/getGold',
        data: {
            typ: 'S'
        },
        success: function(res){
            console.log(res)
            $('#dt-silver').html(dateFormat(res[0].regdt, 'yyyy-MM-dd')+' 기준');
            $('#price-silver').html(tmp({data: res[0], typ: 'S'}))
            price_S = res[0]
        }
    })
})

$(document).on('click', '.price-area .price', function(){
    location.href = _host + '/calc/gold?price=' + $(this).text().replace('원/돈', '');
})
$(document).on('click', '.btn-calc', function(){
    let p = $(this).parents('.price-area')
    location.href = _host + '/calc/gold?price=' + $('.price', p).text().replace('원/돈', '');
})

$(document).on('click', '.btn-unit', function(){
    if($(this).text() == "돈"){
        $(this).text("g")

    }else{
        $(this).text("돈")
    }
    calPrice($(this).text(), $(this).parents('.cal-price'))
})

$(document).on('keyup', '.inp-amt', function(){
    let $obj = $(this).parents('.cal-price');
    calPrice($('.btn-unit', $obj).text(), $obj)
})
$(document).on('keyup', '.inp-price', function (){
    let val = 0;
    if($(this).val()!=''){
        val = parseInt($(this).val().replace(/,/g, ''));
        $(this).val(comma(val+""))
    }
    calAmt(val, $(this).parents('.cal-price'))
})

function calPrice(unit, $obj){
    if($('.inp-amt', $obj).val() == ''){
        $('.inp-price', $obj).val(0)
        $('.inp-price-vat', $obj).text(0)
    }else{
        let res = 0;
        let amt = parseFloat($('.inp-amt', $obj).val().replace(/,/g,''))
        let target = 0;
        if($obj.parents("#price-gold").length > 0){
            target = $obj.hasClass('sell') ? price_G.sell : price_G.vat;
        }else{
            target = $obj.hasClass('sell') ? price_S.sell : price_S.vat;
        }

        if(unit == "돈"){
            res = amt * target;
        }else{
            res = amt * target / 3.75;
        }
        res = Math.round(res)
        $('.inp-price', $obj).val(comma(res+""))
        $('.inp-price-vat', $obj).text(comma(Math.round(res*1.1)+""))
    }
}

function calAmt(price, $obj){
    if(price == 0){
        $('.inp-amt', $obj).val(0)
    }else{
        let res = 0;
        let target = 0;
        if($obj.parents("#price-gold").length > 0){
            target = $obj.hasClass('sell') ? price_G.sell : price_G.vat;
        }else{
            target = $obj.hasClass('sell') ? price_S.sell : price_S.vat;
        }
        if($('.btn-unit', $obj).text() == "돈"){
            res = price / target;
        }else{
            res = price / (target / 3.75);
        }
        if(res.toFixed(2) % 1 > 0){
            res = res.toFixed(2);
        }else{
            res = Math.round(res)
        }
        $('.inp-amt', $obj).val(comma(res+""))
    }
}