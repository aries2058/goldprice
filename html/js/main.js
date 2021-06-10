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
})