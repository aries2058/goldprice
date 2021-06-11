var _host = '/jtoday'

$(function(){
    dispSidebar();
})

function dispSidebar(){
    $('.sidebar, .back').height($(window).height())
    $('.btn-open-sidebar').on('click', ()=>{
        $('.back').show();
        $('.sidebar').animate({
            right:0
        })
    })
    $('.btn-close-sidebar').on('click', ()=>{
        $('.back').hide();
        $('.sidebar').animate({
            right:"-75%"
        })
    })
    $('.back').on('click', function(){
        $('.back').hide();
        $('.sidebar').animate({
            right:"-75%"
        })
    })
}

function comma(obj) {
    var regx = new RegExp(/(-?\d+)(\d{3})/);
	var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
	var strArr = obj.split('.');
	while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
		//정수 부분에만 콤마 달기
		strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
	}
	if (bExists > -1) {
		//. 소수점 문자열이 발견되지 않을 경우 -1 반환
		obj = strArr[0] + "." + strArr[1];
	} else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환
		obj = strArr[0];
	}
	return obj;//문자열 반환
}
function telnum(obj){
    if(obj!='' && obj!=null){
        var len = obj.length;
        var n1='', n2='', n3='';
        if(len == 8){
            return obj.substr(0,4) + '-' + obj.substr(4,4)
        }else {
            n1 = obj.substr(0,2) == '02' ? '02' : obj.substr(0,3);
            n3 = obj.substr(len-4, 4);
            n2 = obj.replace(n1, '');
            n2 = n2.replace(n3, '');
            return n1 + '-' + n2 + '-' + n3;
        }
    }else{
        return ' - ';
    }
}
function biznum(obj){
    if(obj!='' && obj!=null){
        return obj.substr(0,3) + '-' + obj.substr(3, 2) + '-' + obj.substr(5,5);
    }else{
        return '';
    }
}

function imageFormData(canvas){
    var formData = new FormData();
    var arr = canvas.split(',')
    _.each(arr, function(v, i){
        const canvas = document.getElementById(v);
        const imgBase64 = canvas.toDataURL('image/jpeg', 'image/octet-stream');
        const decodImg = atob(imgBase64.split(',')[1]);
        let array = [];
        for (let i = 0; i < decodImg .length; i++) {
            array.push(decodImg .charCodeAt(i));
        }

        const file = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
        const fileName = 'canvas_img_' + new Date().getMilliseconds() + '.jpg';
        formData.append("uploadFiles", file, fileName);
    })
    return formData
}

function imageConverter($file, canvas_id, img_id){
    $file.change(function(){
        flagImage = true;
        var file = $file[0].files[0];

        // 파일을 읽을 수 있는 File Reader 를 생성합니다
        var reader = new FileReader();
        reader.readAsDataURL(file);

        // 파일이 읽혀지면 아래 함수가 실행됩니다
        reader.onload = function(ev) {
            var img = new Image();
            img.src = ev.target.result;

            img.onload = function(e){
                // HTML5 canvas 객체를 생성합니다
                var canvas = document.getElementById(canvas_id);
                var ctx = canvas.getContext("2d");
                // 캔버스에 업로드된 이미지를 그려줍니다
                ctx.drawImage(img, 0, 0);

                // 최대폭을 400 으로 정했다고 가정했을때
                // 최대폭을 넘어가는 경우 canvas 크기를 변경해 줍니다.
                var MAX_WIDTH = 1024;
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
                document.getElementById(img_id).src = dataURL;
            }
        }
    })
}
