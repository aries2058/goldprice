let qna = null;
$(function(){
    dispPhotoAddButton()

    $('#writer').val(_user.user_id)

    $('.board-tab div').click(function (){
        if(!$(this).hasClass('on')){
            $('.board-tab div.on, .screen.on').removeClass('on')
            $(this).addClass('on')
            $('.screen').eq($(this).index()).addClass('on')

            if($(this).index() == 1){
                getList('02', 'W', _user.user_id, function(res){
                    qna = res;
                    let tmp = _.template($('#tmpl-qna').html());
                    $('#list').html(tmp({data: res}))
                })
            }
        }
    })

    $('#btn-close').click(function (){
        history.back()
    })

    $('#btn-submit').click(function (){
        modal.confirm('등록하시겠습니까?', function (){
            uploadBoardPhotos(function(values){
            console.log(values)
                $('#image_ids').val(values)
                $.ajax({
                    type:'post',
                    url: _host + '/board/register',
                    data: $('#frm').serialize(),
                    success: function (res){
                        modal.alert('등록하였습니다.');
                        $('#title').val('')
                        $('#contents').val('')
                        dispPhotoAddButton()
                        $('.board-tab div').eq(1).click();
                    }
                })
            })
        })
    })
})

$(document).on('click', '.qna-item', function (){
    let p = $(this);
    let src = $('.title img', p).attr("src");
    if($(this).hasClass('on')){
        $(this).removeClass('on')
        $('.title img', p).attr("src", src.replace("up", "down"))
    }else {
        $(this).addClass('on')
        let detail = _.where(qna, {id: p.data("id")})[0];
        if($('.comments', p).html() == ""){
            getComments(p.data("id"), $('.comments', p))
        }
        if(detail.image_ids.length > 0){
            let slide = $('.swiper-slide', p).eq(0);
            if($('img', slide).attr('src') == undefined){
                getImages($('.swiper-slide', p), p.data("id"))
            }
        }
        $('.title img', p).attr("src", src.replace("down", "up"))
    }
})

function getImages(obj, id){
    _.each(obj, function(v, i){
        $.ajax({
            url: _host + '/func/getImage',
            data: {id: $(v).data('imgid')},
            success: function (res){
                $('img', v).attr('src', res);
            }
        })
    })
    if(obj.length > 1){
        const swiper = new Swiper('.swiper-area'+id)
    }
}