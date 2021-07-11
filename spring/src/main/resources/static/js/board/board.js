let sttPage = 0

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

function getList(typ, searchTyp, searchVal, callback){
    $.ajax({
        url: _host + '/board/getList',
        data: {
            typ: typ,
            searchTyp: searchTyp,
            searchVal: searchVal,
            sttPage: sttPage,
            perPage: 50
        },
        success: function (res){
            callback(res);
        }
    })
}

function uploadBoardPhotos(callback){
    let prms = [];
    let p = null;
    _.each($('.hid-photo'), function(v, i){
        p = new Promise(function(resolve, reject){
            uploadImage($(v).val(), resolve)
        })
        prms.push(p)
    })

    Promise.all(prms).then(function(values){
        callback(values)
    })
}