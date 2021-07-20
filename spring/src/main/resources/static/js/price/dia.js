let _price = null;
$(function (){
    $('#ct').keyup(function(){
        $('.filter').removeClass('on');
        if($(this).val()< 1){
            $('.filter.under').addClass('on')
        }else{
            $('.filter.up').addClass('on')
        }
        getList()
    })

    $('.filter .btn').click(function (){
        if(!$(this).hasClass('on')){
            let p = $(this).parent();
            $('.btn.on', p).removeClass('on');
            $(this).addClass('on')

            if($(this).text() == "F"){
                $('.f-cut.on').removeClass('on')
                $('.f-cut').eq(1).addClass('on')
            }else if($(this).text() == "G"){
                $('.f-cut.on').removeClass('on')
                $('.f-cut').eq(0).addClass('on')
            }

            getList()
        }
    })

    $.ajax({
        url: _host + '/price/getDia',
        success: function (res){
            _price = res;
            console.log(res)
        }
    })
})

function getList(){
    let data;
    data = _.filter(_price, function(v){
        if(v.ct >= $('#ct').val() && v.ct < (parseFloat($('#ct').val())+0.1).toFixed(1)
            && v.app == '우신'
            && v.level == $('.filter.on .f-level.on').text()
            && v.color == $('.filter.on .f-color.on').text()
            && v.cut == $('.filter.on .f-cut.on').text()){
            return true;
        }
    })

    let tmp = _.template($('#tmpl-list').html())
    $('#list').html(tmp({data: data}))
}