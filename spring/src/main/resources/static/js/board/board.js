let sttPage = 0
let _typ; let _searchTyp; let _searchVal; let _callback;

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        sttPage++;
        getList()
    }
});
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

function getList(typ, searchTyp, searchVal, callback){
    $('#loading').show();
    if(typ != null){
        _typ=typ;
        _searchTyp=searchTyp;
        _searchVal=searchVal;
        _callback=callback;
    }
    $.ajax({
        url: _host + '/board/getList',
        data: {
            typ: _typ,
            searchTyp: _searchTyp,
            searchVal: _searchVal,
            sttPage: sttPage,
            perPage: 5
        },
        success: function (res){
            $('#loading').hide();
            _callback(res);
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