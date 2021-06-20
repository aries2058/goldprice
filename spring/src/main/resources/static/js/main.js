$(function(){
    $('.bg-top').height($(window).height()*0.14+300);
    $('.top-area-tit').css('margin-top',$(window).height()*0.14);

    $(window).scroll(function(){
        if($(window).scrollTop() > 170){
            $('.bg-top').hide()
        }else{
            $('.bg-top').show()
        }
    });

    $.ajax({
        url: _host + '/price/getGold',
        data: {
            typ: 'G'
        },
        success: function(res){
            console.log(res)
            $('.update-dt').html(dateFormat(res[0].regdt, 'yyyy-MM-dd hh:mm:ss')+' 업데이트');
            $('.vat').html(comma(res[0].vat+''))
            $('.ivat').html(comma((res[0].vat*1.1).toFixed(0)+''))
            $('.sell').html(comma(res[0].sell+''))
        }
    })

    $('.calc').click(function (){
        location.href = _host + '/calc/gold?price=' + $(this).prev().text().replace('원/돈', '');
    })

    $('.btn-register').click(function (){
        location.href = _host + '/market/write?id='+_user.market_id
    })
})