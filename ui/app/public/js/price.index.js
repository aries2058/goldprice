$(function(){
    $('.nav-price a').on('click', function(){
        if(!$(this).hasClass('on')){
            dispalyPrice($(this).index())
        }
    })
    $('#tbl-parice-dia').DataTable( {
        searching: false,
        scrollX: true,
        paging: false,
        info: false
    } );
})

function dispalyPrice(idx){
    $('.nav-price a.on').removeClass('on')
    $('.nav-price a').eq(idx).addClass('on')
    $('.tmpl-price.on').removeClass('on');
    $('.tmpl-price').eq(idx).addClass('on')
}