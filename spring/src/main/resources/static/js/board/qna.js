let sttPage = 0
let qna = null;
$(function(){
    dispPhotoAddButton()

    $('#writer').val(_user.user_id)

    $('.qnatab div').click(function (){
        if(!$(this).hasClass('on')){
            $('.qnatab div.on, .screen.on').removeClass('on')
            $(this).addClass('on')
            $('.screen').eq($(this).index()).addClass('on')

            if($(this).index() == 1){
                getList()
            }
        }
    })

    $('#btn-close').click(function (){
        history.back()
    })

    $('#btn-submit').click(function (){
        modal.confirm('등록하시겠습니까?', function (){
            $.ajax({
                type:'post',
                url: _host + '/board/register',
                data: $('#frm').serialize(),
                success: function (res){
                    modal.alert('등록하였습니다.');
                    $('.qnatab div').eq(1).click();
                }
            })
        })
    })
})

$(document).on('click', '.qna-item', function (){
    let p = $(this);
    let src = $('.title img', p).attr("src");
    console.log(src)
    if($(this).hasClass('on')){
        $(this).removeClass('on')
        $('.title img', p).attr("src", src.replace("up", "down"))
    }else {
        $(this).addClass('on')
        if($('.contents>div', p).html() == ""){
            $('.contents>div', p).html(_.where(qna, {id: p.data("id")})[0].contents)

            getComments(p.data("id"), $('.contents', p))
        }
        $('.title img', p).attr("src", src.replace("down", "up"))
    }
})

function getComments(bid, obj){
    $.ajax({
        url: _host + '/board/getComments',
        data: {id : bid},
        success: function (res){
            $('#comment-cnt').html(res.length)
            if(res.length > 0){
                var tmp = _.template($('#tmpl-comment').html());
                obj.append(tmp({data: res}))
            }
        }
    })
}

function getList(){
    $.ajax({
        url: _host + '/board/getList',
        data: {
            typ: '02',
            searchTyp: "W",
            searchVal: _user.user_id,
            sttPage: sttPage,
            perPage: 50
        },
        success: function (res){
            console.log(res)
            qna = res;
            var tmp = _.template($('#tmpl-qna').html());
            $('#list').html(tmp({data: res}))
        }
    })
}
