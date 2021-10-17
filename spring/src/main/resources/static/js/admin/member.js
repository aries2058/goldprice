let sttPage = 0
$(function (){
    $('.back').height($(window).height())

    getList();
    $('#searchVal').keyup(function (e){
        if(e.keyCode == 13){
            getList()
        }
    })
    $('#confirm').click(function (){
        getList();
    })

})

function getList(){
    $.ajax({
        url: _host + '/auth/getMemberList',
        data: {
            sttPage: sttPage,
            perPage: 20,
            searchVal: $('#searchVal').val(),
            confirm: $('#confirm').is(':checked') ? "W" : ""
        },
        success: function (res){
            console.log(res)
            let tmp = _.template($('#tmpl-list').html())
            $('#list').html(tmp({data:res}))
        }
    })
}

$(document).on('click', '.member-item .title', function (){
    let p = $(this).parent()
    if($('.member-info', p).hasClass('on')){
        $('.member-info', p).removeClass('on')
    }else{
        $('.member-info.on').removeClass('on')
        $('.member-info', p).addClass('on')
    }
})

$(document).on('click', '.btn-photo', function (){
    let p = $(this).data('photos')
    window.open(_host + "/main/viewPhoto?ids="+p)
})

$(document).on('click', '.btn-confirm', function (){
    let userid = $(this).data('userid');
    $.ajax({
        type: 'post',
        url: _host + '/auth/confirmMember',
        data: {userid: userid, confirm: 'Y'},
        success: function(){
            modal.alert('승인 처리하였습니다.')
            location.reload();
        }
    })
})


function imageIds(arr){
    let ret = '';
    _.each(arr, function(v){
        ret += v + ",";
    })
    return ret.substr(0, ret.length-1)
}