let map = null;
let place = null;
let markerLocation = null;

$(function(){
    $('.top-bar').remove();
    $('#map, #search-list').height($(window).height())
    let mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(37.5712416,126.9923948),
            level: 1 // 지도의 확대 레벨
        };

    map = new kakao.maps.Map(mapContainer, mapOption),
        customOverlay = new kakao.maps.CustomOverlay({}),
        infowindow = new kakao.maps.InfoWindow({removable: true});

    $.ajax({
        url: _host + '/market/getMap',
        success: function(res) {
            place = res;
            console.log(place)
        }
    })

    $('#search-place').keyup(function(e){
        if($(this).val()==""){
            $('.search-area').removeClass('on')
            $('#search-list').hide();
        }

        if(e.keyCode == 13){
            let $p = $('#search-list .place').eq(0)
            ShowPlace($p.data('id'), $p.data('mid'))
        }else{
            $('.search-area').addClass('on')
            let tmp = _.template($('#tmpl-search-list').html())
            $('#search-list').html(tmp({data : autoComplate()}))
            $('#search-list').show();
        }
    })
})

$(document).on('click', '.place-link', function(){
    window.open(_host+'/market/list?placenm=' + $(this).text() + '&mapid=' + $(this).data('mapid'))
})

$(document).on('click', '#search-list .place', function(){
    $('#search-list').hide();
    let $p = $(this)
    ShowPlace($p.data('id'), $p.data('mid'))
})

$(document).on('click','#btn-list', function(){
    $('#detail').hide()
    $('#list').show()
})

function ShowPlace(id, mid){
    let imageLoc = _host + "/images/marker_point.png";
    let imageSize = new kakao.maps.Size(30, 33);
    let p = _.where(place, {id: id})[0];
    $('#search-place').val(p.place_nm)
    if(markerLocation!=null)
        markerLocation.setMap(null)

    markerLocation = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(p.lat, p.lng),
        image: new kakao.maps.MarkerImage(imageLoc, imageSize)
    });
    let position = new kakao.maps.LatLng(p.lat, p.lng);
    map.setCenter(position);

    let tmp =  _.template($('#tmpl-detail').html());
    $('#detail').html(tmp({data: p, market: mid==null?null: _.where(p.market, {id: mid})[0]}))
    $('#detail').show()
}

function autoComplate() {
    let ret = [];
    _.each(place, function(v){
        if(v.place_nm.toLowerCase().indexOf($('#search-place').val().toLowerCase()) > -1){
            v.ismarket = false
            ret.push({
                id: v.id,
                place_nm: v.place_nm,
                ismarket: false,
                addr: v.addr
            })
        }

        if(v.market.length > 0 && $('#search-place').val() != ''){
            _.each(v.market, function(xv){
                if(xv.market_nm.toLowerCase().indexOf($('#search-place').val().toLowerCase()) > -1){
                    ret.push({
                        id: v.id,
                        place_nm: v.place_nm,
                        ismarket: true,
                        market_nm: xv.market_nm,
                        market_id: xv.id,
                        addr: v.addr
                    })
                }
            })
        }
    })
    console.log(ret)
    return ret;
}

function displayArea(area) {

    // 다각형을 생성합니다
    let polygon = new kakao.maps.Polygon({
        map: map, // 다각형을 표시할 지도 객체
        path: area.path,
        strokeWeight: 2,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        fillColor: '#fff',
        fillOpacity: 0.7
    });

    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
    // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
    kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
        polygon.setOptions({fillColor: '#09f'});

        customOverlay.setContent('<div class="area">' + area.name + '</div>');

        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
    });

    // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
    kakao.maps.event.addListener(polygon, 'mousemove', function(mouseEvent) {

        customOverlay.setPosition(mouseEvent.latLng);
    });

    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
    // 커스텀 오버레이를 지도에서 제거합니다
    kakao.maps.event.addListener(polygon, 'mouseout', function() {
        polygon.setOptions({fillColor: '#fff'});
        customOverlay.setMap(null);
    });

    // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
    kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
        let content = '<div class="info">' +
            '   <div class="title">' + area.name + '</div>' +
            '   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></area>' +
            '</div>';
        infowindow.setContent(content);
        infowindow.setPosition(mouseEvent.latLng);
        infowindow.setMap(map);
    });
}
