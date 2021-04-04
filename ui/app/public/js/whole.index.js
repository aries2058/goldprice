$(function(){
    $('.btn-whole-area.scroll-x').scrollLeft($('.btn-whole.on').offset().left) 
    $('.btn-whole').on('click', function(){
        if(!$(this).hasClass('on')){
            dispalyPrice($(this).index())
        }
    })
})

function dispalyPrice(idx){
    $('.btn-whole.on').removeClass('on')
    $('.btn-whole').eq(idx).addClass('on')
}