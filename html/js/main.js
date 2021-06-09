$(function(){
    $('.bg-top').height($(window).height()*0.55);
    $('.top-area-tit').css('margin-top',$(window).height()*0.13);

    $(window).scroll(function(){
        if($(window).scrollTop() > 170){
            $('.bg-top').hide()
        }else{
            $('.bg-top').show()
        }
    });

    $('.btn-right').height($('#img-btn-calc').height()/2-20)
})