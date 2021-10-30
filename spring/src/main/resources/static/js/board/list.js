$(function (){
    $('#btn-board-write').click(function(){
        window.open(_host + '/board/write?typ=01')
    })

    getList($('#typ').val(), null, null, function (res){
        let tmp = _.template($('#tmpl-list').html());
        $('#all-list').append(tmp({data: res}))
        _.each($('.b-photo'), function (v){
            if($('img', v).attr("src") == undefined){
                getImage(v, $(v).data('id'))
            }
        })
    })
    $('.board-tab div').click(function (){
        if(!$(this).hasClass('on')){
            $('.board-tab div.on, .screen.on').removeClass('on')
            $(this).addClass('on')
            $('.screen').eq($(this).index()).addClass('on')
            $('#all-list, #my-list').empty()
            sttPage = 0;
            if($(this).index() == 0){
                getList($('#typ').val(), null, null, function (res){
                    let tmp = _.template($('#tmpl-list').html());
                    $('#all-list').append(tmp({data: res}))
                    _.each($('.b-photo'), function (v){
                        if($('img', v).attr("src") == undefined){
                            getImage(v, $(v).data('id'))
                        }
                    })
                })
            }else{
                getList($('#typ').val(), "W", _user.user_id, function (res){
                    let tmp = _.template($('#tmpl-list').html());
                    $('#my-list').append(tmp({data: res}))
                    _.each($('.b-photo'), function (v){
                        if($('img', v).attr("src") == undefined){
                            getImage(v, $(v).data('id'))
                        }
                    })
                })
            }
        }
    })
})
$(document).on('click', '.link, .b-contents, .b-photo', function (){
    let $obj = $(this).parents('.board-item')
    window.open(_host + '/board/detail?id='+$obj.data('bid')+'&typ=' + $('#typ').val());
})

function getImage(obj, id){
    $.ajax({
        url: _host + '/func/getImagePath',
        data: {id: id},
        success: function (res){
            $('img', obj).attr('src', _display + res);
        }
    })
}