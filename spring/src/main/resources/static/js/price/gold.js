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