let _price = null;
$(function (){
    $('#btn-show-all').click(function (){
        window.open(_host + "/main/viewPhoto?src=price_dia");
    })

    $('#ct').keyup(function(e){
        if(e.keyCode == 13){
            getFilter()
        }else{
            if($(this).val() != ''){
                getct($(this).val());
                $('#autoct').addClass('on')
            }else{
                $('#autoct').removeClass('on')
            }
        }
    })
    $('#ct').focusout(function(){
        $('#autoct').removeClass('on')
    })

    $('.filter .btn').click(function (){
        if(!$(this).hasClass('on')){
            let p = $(this).parent();
            $('.btn.on', p).removeClass('on');
            $(this).addClass('on')

            if($('.nav-link.active').text() == '우신'){
                if($(this).text() == "F"){
                    $('.f-cut.on').removeClass('on')
                    $('.f-cut').eq(1).addClass('on')
                }else if($(this).text() == "G"){
                    $('.f-cut.on').removeClass('on')
                    $('.f-cut').eq(0).addClass('on')
                }
            }

            getList()
        }
    })

    $('.nav-tabs').on('shown.bs.tab', function (){
        getFilter()
    })

    $.ajax({
        url: _host + '/price/getDia',
        success: function (res){
            _price = res;
            getFilter();
            console.log(res)
        }
    })
})

$(document).on('click', '.ct-item', function(){
    $('#ct').val($(this).text())
    getFilter()
})


function getFilter(){
    $('#autoct').removeClass('on')
    $('.filter').removeClass('on');
    if($('.nav-link.active').text() == '우신') {
        if($('#ct').val()< 1){
            $('.tab-pane.active .filter.under').addClass('on')
        }else{
            $('.tab-pane.active .filter.up').addClass('on')
        }
    }else{
        $('.tab-pane.active .filter.under').addClass('on')
    }
    getList()
}

function getct(val){
    let tmp = _.template($('#tmpl-autoct').html());
    let ct = _.map(_price, function (v){
        if(v.app == $('.nav-link.active').text() && v.ct.toString().indexOf(val) == 0)
           return v.ct;
    })
    ct = Array.from(new Set(_.compact(ct)));
    $('#autoct').html(tmp({data:ct }))
}

function getList(){
    let data;
    data = _.filter(_price, function(v){
        if(v.ct >= $('#ct').val() && v.ct < (parseFloat($('#ct').val())+0.1).toFixed(1)
            && v.app ==  $('.nav-link.active').text()
            && v.level == $('.tab-pane.active .filter.on .f-level.on').text()
            && v.color == $('.tab-pane.active .filter.on .f-color.on').text()
            && v.cut == $('.tab-pane.active .filter.on .f-cut.on').text()){
            return true;
        }
    })

    let tmp = _.template($('#tmpl-list').html())
    $('#list').html(tmp({data: data}))
}