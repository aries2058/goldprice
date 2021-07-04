$(function () {
    $('#btn-back').click(function (){
        history.back()
    })
    $.ajax({
        url: _host + '/market/getMarket',
        data: {
            id: $('#market_id').val()
        },
        success: function (res){
            console.log(res)
            $('.top-bar .title').text(res.market_nm)
            $('#contents').text(res.contents)
            if(res.link_homepage != null){
                $('#link-items').append('<a href="'+res.link_homepage+'"><img src="'+_host+'/images/icon_homepage.svg" /></a>')
            }
            if(res.link_goldpen != null){
                $('#link-items').append('<a href="'+res.link_goldpen+'"><img src="'+_host+'/images/icon_goldpen.svg" /></a>')
            }
            if(res.link_kakao != null){
                $('#link-items').append('<a href="'+res.link_kakao+'"><img src="'+_host+'/images/icon_kakao.svg" /></a>')
            }
            if(res.link_sns != null){
                $('#link-items').append('<a href="'+res.link_sns+'"><img src="'+_host+'/images/icon_sns.svg" /></a>')
            }
            $('#addr').text(res.addr + " " + res.addr_detail);
            $('#tel').text(telnum(res.tel));
            if(res.item_typ != null){
                _.each(itemtyp(res.item_typ), function (v){
                    $('#items').append('<span class="badge">'+v+'</span>')
                })
            }
            let mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(res.lat, res.lng), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };

            let map = new kakao.maps.Map(mapContainer, mapOption);
            let markerPosition  = new kakao.maps.LatLng(res.lat, res.lng);
            let marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map);
            $('#map').click(function (){
                window.open('https://map.kakao.com/link/to/'+res.market_nm+','+ res.lat +',' + res.lng)
            })

            if(res.image_ids != null && res.image_ids.length > 0){
                let prms = [];
                let p = null;
                _.each(res.image_ids, function(v){
                    p = new Promise(function(resolve, reject){
                        $.ajax({
                            url: _host + '/func/getImage',
                            data: {id: v},
                            success: function (xres){
                                let tmp = _.template($('#tmpl-photo').html());
                                $('#photo-area').append(tmp({data: xres}))
                                resolve(xres)
                            }
                        })
                    })
                    prms.push(p)
                })

                Promise.all(prms).then(function(values){
                    $('#photo-area .carousel-item').height($(window).height()*0.3)
                    $('#photo-area .carousel-item').eq(0).addClass('active')
                    $('#photo-page').text("1/"+values.length)
                    var carousel = document.getElementById('carousel-photo-area')
                    carousel.addEventListener('slid.bs.carousel', function (e) {
                        $('#photo-page').text((parseInt($(e.relatedTarget).index() ) + 1) + "/"+values.length)
                    })
                })
            }
        }
    })
})
