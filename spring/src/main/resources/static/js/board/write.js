$(function(){
    $('#writer').val(_user.user_id)

    $.ajax({
        url: _host + '/board/getBoard',
        data: {id : $('#bid').val()},
        success: function (res){
            $('#title').val(res.title)
            $('#contents').val(res.contents)
            $('#image_ids').val(res.image_ids)
            if(res.image_ids != null && res.image_ids.length > 0){
                let prms = [];
                let p = null;
                _.each(res.image_ids, function(v){
                    p = new Promise(function(resolve, reject){
                        $.ajax({
                            url: _host + '/func/getImage',
                            data: {id: v},
                            success: function (xres){
                                let tmp = _.template($('#tmpl-added-photos').html());
                                $('.added-photos').append(tmp({data: xres, flag: true}))
                                $('.photo>div').height($('.photo>div').width())
                                resolve(xres)
                            }
                        })
                    })
                    prms.push(p)
                })

                Promise.all(prms).then(function(values){
                    if($('.photo').length < 3){
                        dispPhotoAddButton()
                    }
                })
            }
            else{
                dispPhotoAddButton()
            }
        }
    })

    $('#btn-submit').click(function (){
        modal.confirm('등록하시겠습니까?', function(){
            uploadBoardPhotos(function(values){
                $('#image_ids').val(values)
                $.ajax({
                    type:'post',
                    url: _host + '/board/register',
                    data: $('#frm').serialize(),
                    success: function (res){
                        opener.parent.location.reload();
                        window.close();
                    }
                })
            })
        })
    })
})