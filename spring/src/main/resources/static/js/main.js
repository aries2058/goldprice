$(function(){
    $('.bg-top').height($(window).height()*0.15+360);
    $('.top-area-tit').css('margin-top',$(window).height()*0.12);


    $.ajax({
        url: _host + '/price/getGold',
        data: {
            typ: 'G'
        },
        success: function(res){
            console.log(res)
            $('.update-dt').html('업데이트 ' + dateFormat(res[0].regdt, 'yyyy-MM-dd hh:mm:ss'));
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

    let push = getPush();
    if(push !=null && push.push_yn == null){
        modal.confirm("Push알림을 허용하시겠습니까?", function (){
            push.push_yn = 'Y'
            $.ajax({
                type: 'post',
                url: _host + '/func/setPushToken',
                data: push,
                success: function (res){
                    console.log(res)
                    alert("푸시허용처리됨!")
                    setPush(push)
                }
            })
        }, function (){
            $.ajax({
                type: 'post',
                url: _host + '/func/setPushToken',
                data: {
                    uuid: _user.uuid,
                    pushYn: 'N'
                },
                success: function (res){
                    console.log(res)
                    alert("푸시거절처리됨!")
                    push.push_yn = 'N'
                    setPush(push)
                }
            })
        })
    }
})