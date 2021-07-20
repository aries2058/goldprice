let sttPage = 0
$(function (){
    $('.btn-nav').eq(parseInt($('#typ').val())).addClass('on')
    $('.btn-nav-area').scrollLeft($('.btn-nav.on').offset().left-30)

    $('.btn-nav').click(function (){
        if(!$(this).hasClass('on')){
            $('.btn-nav.on').removeClass('on')
            $(this).addClass('on')
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
            $('#hot-area .carousel-inner').html(tmp({data: res}))
            _.each($('#hot-area .photo'), function (v, i){
                let p = $(v)
                if($('a', p).data('imageid')!=null){
                    getMarketImage($('a', p).data('imageid'), $('a', p))
                }
            })
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
            _.each($('#market-list .photo'), function (v, i){
                let p = $(v)
                if($('a', p).data('imageid')!=null){
                    getMarketImage($('a', p).data('imageid'), $('a', p))
                }
            })
        }
    })
}
function getMarketImage(imageid, obj){
    $.ajax({
        url: _host + '/func/getImage',
        data: {id: imageid},
        success: function (res){
            obj.css('backgroundImage', 'url('+res+')');
        }
    })
}