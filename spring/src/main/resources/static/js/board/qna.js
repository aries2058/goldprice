let sttPage = 0
let qna = null;
$(function(){
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


    $('#contents').summernote({
        height: $(window).height() - 400,
        lang: "ko-KR",
        toolbar: [],
        placeholder: '문의하실 내용을 입력하세요.',
        callbacks: {
            onFocus: function() {
                $('.info, #btn-submit, #title').hide()
                $('.btn-area').show()
            }
        }
    });

    $('#btn-ok').click(function (){
        $('.info, #btn-submit, #title').show()
        $('.btn-area').hide()
    })
    $('#btn-photo').click(function (){
        $('#file-photo').click()
    })

    $('#file-photo').change(function(){
        var file =  $('#file-photo')[0].files[0];

        // 파일을 읽을 수 있는 File Reader 를 생성합니다
        var reader = new FileReader();
        reader.readAsDataURL(file);

        // 파일이 읽혀지면 아래 함수가 실행됩니다
        reader.onload = function(ev) {
            var img = new Image();
            img.src = ev.target.result;

            img.onload = function(e){
                // HTML5 canvas 객체를 생성합니다
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext("2d");
                // 캔버스에 업로드된 이미지를 그려줍니다
                ctx.drawImage(img, 0, 0);

                // 최대폭을 400 으로 정했다고 가정했을때
                // 최대폭을 넘어가는 경우 canvas 크기를 변경해 줍니다.
                var MAX_WIDTH = window.outerWidth - 60;
                var MAX_HEIGHT = 1024;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                }
                else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;

                // canvas에 변경된 크기의 이미지를 다시 그려줍니다.
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                // canvas 에 있는 이미지를 img 태그로 넣어줍니다
                var dataURL = canvas.toDataURL("image/png");
                var html = "<img src='"+ dataURL +"' />"
                $('#contents').summernote('pasteHTML', html);
            }
        }
    })

    $('#btn-close').click(function (){
        history.back()
    })

    $('#btn-submit').click(function (){
        if(confirm('등록하시겠습니까?')){
            $.ajax({
                type:'post',
                url: _host + '/board/register',
                data: $('#frm').serialize(),
                success: function (res){
                    alert('등록하였습니다.');
                    $('.qnatab div').eq(1).click();
                }
            })
        }
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