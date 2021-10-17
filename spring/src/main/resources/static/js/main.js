$(function(){
    $('.bg-top').height($(window).height()*0.15+400);

    $.ajax({
        url: _host + '/price/getGold',
        data: {
            typ: 'G'
        },
        success: function(res){
            $('.update-dt').html('업데이트 ' + dateFormat(res[0].regdt, 'yyyy-MM-dd hh:mm:ss'));
            $('.vat').html(comma(res[0].vat+''))
            $('.ivat').html(comma((res[0].vat*1.1).toFixed(0)+''))
            $('.sell').html(comma(res[0].sell+''))
        }
    })

    $('.search-bar').click(function (){
        location.href = _host + '/market/listByItem?typ=00'
    })

    $('.price-area').click(function (){
        location.href = _host + '/calc/gold?price=' + $(this).prev().text().replace('원/돈', '');
    })

    $('.btn-register').click(function (){
        window.open(_host + '/market/write?id='+_user.market_id)
    })

    let push = getPush();
    if(push != null && push.push_yn == null && window.android != undefined){
        push.uuid = _user.uuid
        modal.confirm("Push알림을 허용하시겠습니까?", function (){
            push.push_yn = 'Y'
            $.ajax({
                type: 'post',
                url: _host + '/func/setPushToken',
                data: push,
                success: function (res){
                    modal.alert("푸시알림을 허용합니다.")
                    setPush(push)
                }
            })
        }, function (){
            push.push_yn = 'N'
            $.ajax({
                type: 'post',
                url: _host + '/func/setPushToken',
                data: push,
                success: function (res){
                    modal.alert("푸시알림을 해제합니다.")
                    setPush(push)
                }
            })
        })
    }
})