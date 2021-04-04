$(function(){
    $('.splash, .sidebar').height($(window).height())

    $('.btn-open-sidebar').on('click', ()=>{
        $('.sidebar').animate({
            right:0
        })
    })
    $('.btn-close-sidebar').on('click', ()=>{
        $('.sidebar').animate({
            right:"-75%"
        })
    })

    $('.btn-calc').on('click', function(){
        location.href = '/common/calc?price='+$(this).text();
    })

    $('.container-fluid').not('.sidebar, .header').on('click', function(){
        $('.sidebar').animate({
            right:"-75%"
        })
    })
    // setTimeout(() => {
    //     $('.splash').fadeOut()
    // }, 1000);
})

