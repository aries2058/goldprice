var map = null;
$(function(){
    $('#map').height($(window).height()/2)
    $('#list').height($(window).height()/2)
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.5712416,126.9923948), //지도의 중심좌표.
        level: 1 //지도의 레벨(확대, 축소 정도)
    };
    
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    var imagePos = "http://t1.daumcdn.net/mapjsapi/images/2x/marker.png";
    var imageLoc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    var imageSize = new kakao.maps.Size(24, 35); 
    var markerImage = new kakao.maps.MarkerImage(imagePos, imageSize); 
    var markerLocation = null;
    var markers = [];
    $.ajax({
        url: 'http://mnisdh.synology.me:7070/goldprice/api/map/getMapInfo',
        success: function(res){
            _.each(res, function(v){
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: new kakao.maps.LatLng(v.lat, v.lng), // 마커를 표시할 위치
                });
                // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
                var iwContent = '<div class="mapinfo"><i class="far fa-gem"></i> '+ v.place_nm +'</div>';
                
                kakao.maps.event.addListener(marker, 'click', function() {
                    $('.mapinfo').parent().parent().remove();
                    
                    if(markerLocation!=null)
                        markerLocation.setMap(null)

                    markerLocation = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(v.lat, v.lng), 
                        image: new kakao.maps.MarkerImage(imageLoc, imageSize)
                    });

                    var infowindow = new kakao.maps.InfoWindow({
                        content : iwContent,
                        removable : false
                    })
                    infowindow.open(map, marker);  
                });
                //markers.push(marker)
            })
            var tmp = _.template($('#tmpl-list').html());
            $('#list').html(tmp({data: res}))

            $('.btn-location').click(function(){
                $('.mapinfo').parent().parent().remove();
                var idx = $(this).data('idx');
                var lat = $(this).data('lat');
                var lng = $(this).data('lng');
                var position = new kakao.maps.LatLng(lat, lng);
                map.setCenter(position);
                
                if(markerLocation!=null)
                    markerLocation.setMap(null)

                markerLocation = new kakao.maps.Marker({
                    map: map,
                    position: position, 
                    image: new kakao.maps.MarkerImage(imageLoc, imageSize)
                });

                // _.each(markers, function(v, i){
                //     if(i == idx){
                //         v.setImage(new kakao.maps.MarkerImage(imageLoc, imageSize))
                //     }else{
                //         v.setImage(markerImage)
                //     }
                // })

            })
        }
    })
})
