var sttPage = 0
$(function (){
    $('.btn-nav').eq(parseInt($('#typ').val())-1).addClass('on')
    $('.btn-nav-area').scrollLeft($('.btn-nav.on').offset().left-30)

    $('.btn-nav').click(function (){
        if(!$(this).hasClass('on')){
            $('.btn-nav.on').removeClass('on')
            $(this).addClass('on')
        }
    })
})