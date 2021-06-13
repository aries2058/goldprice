$(function(){
    $('#contents').summernote({
        height: $(window).height() - $('.board-info').height() - $('.top-bar').height() - $('.bottom-bar').height() - 12,
        lang: "ko-KR",
        toolbar: [],
        placeholder: '내용을 입력하세요.',
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

    $('#btn-submit').click(function (){
        if(confirm('등록하시겠습니까?')){
            $.ajax({
                type:'post',
                url: _host + '/board/register',
                data: $('#frm').serialize(),
                success: function (res){
                    alert('등록하였습니다.');
                    location.href = _host + '/board/detail?typ='+$('#board_typ').val()+'&id=' + res
                }
            })
        }
    })
})