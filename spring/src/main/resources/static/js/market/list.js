var sttPage = 0
$(function (){
    $.ajax({
        url: _host + '/market/getMarketList',
        data: {
            mapid: $('#mapid').val()
        },
        success: function (res){
            let tmp = _.template($('#tmpl-list').html())
            $('#list').html(tmp({data: res}))
        }
    })

    $('#btn-back').click(function (){
        window.close();
    })
})