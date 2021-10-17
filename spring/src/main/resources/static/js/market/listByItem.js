let sttPage = 0
$(function (){
    $('.btn-nav').eq(parseInt($('#typ').val())).addClass('on')
    $('.btn-nav-area').scrollLeft($('.btn-nav.on').offset().left-30)

    $('.btn-nav').click(function (){
        if(!$(this).hasClass('on')){
            $('.btn-nav.on').removeClass('on')
            $(this).addClass('on')
            getListByTyp($(this).data('typ'))
        }
    })
    getHotList();
    getList();

    $('.top-bar-area').appendTo($('.top-bar'))
})

$(document).on('click', '.link-detail', function (){
    let market = $(this).parents('.market')
    window.open(_host + '/market/detailByItem?id=' + market.data('marketid'))
})

function getHotList(){
    $.ajax({
        url: _host + '/market/getHotMarketList',
        success: function (res){
            console.log(res)
            let tmp = _.template($('#tmpl-market-hot').html());
            $('#hot-area').html(tmp({data: res}))
        }
    })
}

function getList(){
    $.ajax({
        url: _host + '/market/getMarketListByItem',
        data: {
            searchVal : $('#search-market').val(),
            sttPage : sttPage,
            perPage : 20
        },
        success: function (res){
            console.log(res)
            let tmp = _.template($('#tmpl-market').html());
            $('#market-list').html(tmp({data: res}))
        }
    })
}
function getListByTyp(typ){
    $.ajax({
        url: _host + '/market/getMarketListByItemTyp',
        data: {
            searchVal : typ,
            sttPage : sttPage,
            perPage : 20
        },
        success: function (res){
            let tmp = _.template($('#tmpl-market').html());
            $('#market-list').html(tmp({data: res}))
        }
    })
}