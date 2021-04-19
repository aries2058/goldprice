var map = null;
$(function(){
    $('#map').height($(window).height())
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.5712416,126.9923948), //지도의 중심좌표.
        level: 1 //지도의 레벨(확대, 축소 정도)
    };
    
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    var geocoder = new kakao.maps.services.Geocoder();
    customOverlay = new kakao.maps.CustomOverlay({}),
    infowindow = new kakao.maps.InfoWindow({removable: true});
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        var latlng = mouseEvent.latLng;
        console.log(latlng)
        

        // $.each(data.levels[0].locations, function(i, v){
        //     var addr = v.description.replace('주소 :', '');
        //     if(addr != ''){
        //         geocoder.addressSearch(addr, function(res){
        //             if(res[0] != null){
        //             console.log(addr +'\t'+ res[0].x +"\t"+ res[0].y)
        //             }else{
        //             console.log(addr +'\t'+ '' +"\t"+ '')
        //             }
        //            // console.log(res[0].x +"\t"+ res[0].y)
        //         });
        //     }
        // })
    });

    var areas = [{
        name: "일번지<br />귀금속",
        path: [
            new kakao.maps.LatLng(37.57080827715288,126.99222339372041),
            new kakao.maps.LatLng(37.57075646992366,126.99222339910699),
            new kakao.maps.LatLng(37.57068214374181,126.99231396396046),
            new kakao.maps.LatLng(37.57081729266759,126.9923082902416),
            new kakao.maps.LatLng(37.57080827715288,126.99222339372041)
        ],
        position: new kakao.maps.LatLng(37.5707632307328,126.99227716582527)
    }]

    // 지도에 영역데이터를 폴리곤으로 표시합니다 
    for (var i = 0, len = areas.length; i < len; i++) {
        var polygon = new kakao.maps.Polygon({
            map: map, // 다각형을 표시할 지도 객체
            path: areas[i].path,
            strokeWeight: 2,
            strokeColor: '#FFC000',
            strokeOpacity: 0.8,
            fillColor: '#FFF200',
            fillOpacity: 0.5
        });
        var position = areas[i].position;  
        var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: "<small class='lb'>"+areas[i].name+"</small>"   
        });
        customOverlay.setMap(map);
    }
})

var data = {
    "mapwidth": "360",
    "mapheight": "236",
    "categories": [ {
                "id": "B0063",
                "title": "곡천빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0026",
                "title": "골드귀금속타운",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0001",
                "title": "골드뱅크",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0085",
                "title": "골드타운",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0002",
                "title": "골든타워",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0007",
                "title": "광은상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0034",
                "title": "금강귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0017",
                "title": "금강쥬얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0010",
                "title": "금밭상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0011",
                "title": "금사랑상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0075",
                "title": "금사랑투",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0029",
                "title": "금성빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0096",
                "title": "금은빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0031",
                "title": "금정빌딩(별관)",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0015",
                "title": "금정상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0006",
                "title": "금탑주얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "D0002",
                "title": "다이아몬드빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0017",
                "title": "대광상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0028",
                "title": "대림상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0048",
                "title": "대보귀금속도매백화점",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0076",
                "title": "대성귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0080",
                "title": "대성빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0011",
                "title": "대성주얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0100",
                "title": "대화상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0042",
                "title": "동양과학빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0003",
                "title": "동양귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0098",
                "title": "디아망",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0028",
                "title": "럭키귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0002",
                "title": "로얄귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0013",
                "title": "명품주얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0047",
                "title": "모란귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0001",
                "title": "미도빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0040",
                "title": "보석백화점",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0022",
                "title": "보성귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0034",
                "title": "삼보빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0018",
                "title": "삼보상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0061",
                "title": "삼삼쥬얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0045",
                "title": "삼성귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0004",
                "title": "삼영귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0019",
                "title": "삼영귀금속도매상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0008",
                "title": "삼영빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0015",
                "title": "삼오빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0101",
                "title": "삼오재료상사",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0016",
                "title": "수안빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0081",
                "title": "삼정금은",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0037",
                "title": "서울귀금속도매상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0020",
                "title": "서울귀금속상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0024",
                "title": "서울쥬얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0008",
                "title": "서진빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0027",
                "title": "성보귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0004",
                "title": "성창귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0006",
                "title": "세화상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0003",
                "title": "스타귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0060",
                "title": "신광빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0021",
                "title": "썬쥬얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0074",
                "title": "아트귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0036",
                "title": "엄지귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0033",
                "title": "에메랄드하우스",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0019",
                "title": "에이스상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0029",
                "title": "영동빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0046",
                "title": "영보귀금속상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0084",
                "title": "영보빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0068",
                "title": "온녕빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0039",
                "title": "우리귀금속도매상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0023",
                "title": "우신보석상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0018",
                "title": "원귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0047",
                "title": "월드귀금속도매백화점",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0035",
                "title": "유금빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0035",
                "title": "일번지 귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0030",
                "title": "제일귀금속 도매상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0012",
                "title": "조웅빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0042",
                "title": "조흥귀금속도매상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0040",
                "title": "종로3가 귀금속도매백화점",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0001",
                "title": "종로주얼리타운",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0043",
                "title": "종로타운",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0077",
                "title": "종묘빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0038",
                "title": "중앙귀금속상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0031",
                "title": "중앙빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0026",
                "title": "쥬벨빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0073",
                "title": "쥬얼리파크",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0066",
                "title": "지성빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0009",
                "title": "진주빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0037",
                "title": "진쥬얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0027",
                "title": "청룡귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0041",
                "title": "코리아주얼랜드",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0033",
                "title": "탑귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0044",
                "title": "태일귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0022",
                "title": "토보에",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0016",
                "title": "티파니",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "D0001",
                "title": "피카디리플러스",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0078",
                "title": "하나로귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0035",
                "title": "하나빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0032",
                "title": "한국금거래소빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0025",
                "title": "한미귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0044",
                "title": "한양타운",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0046",
                "title": "한일귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0032",
                "title": "한진빌딩",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0036",
                "title": "행복귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0023",
                "title": "현대귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0045",
                "title": "현대귀금속프라자",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0009",
                "title": "황금송아지",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0012",
                "title": "황룡귀금속",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0005",
                "title": "A1 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0007",
                "title": "A2 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0010",
                "title": "A4 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0004",
                "title": "A5 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0013",
                "title": "B1 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0039",
                "title": "B2 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0038",
                "title": "B8 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "C0001",
                "title": "C1 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0062",
                "title": "C3 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0064",
                "title": "C5 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0067",
                "title": "C6 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0093",
                "title": "C7 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0088",
                "title": "C8 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0094",
                "title": "C10 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0089",
                "title": "C11 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0090",
                "title": "C12 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0091",
                "title": "C13 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0092",
                "title": "C14 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0095",
                "title": "C15 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0087",
                "title": "C16 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0086",
                "title": "C17 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0041",
                "title": "D1 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0082",
                "title": "D5 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "E0033",
                "title": "D8 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "M0036",
                "title": "F1 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0059",
                "title": "F2 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0052",
                "title": "F3 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0104",
                "title": "A9 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0105",
                "title": "A8 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0106",
                "title": "B6 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0107",
                "title": "D4 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0108",
                "title": "금성쥬얼리",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0109",
                "title": "기타",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0110",
                "title": "단성골드주얼리센터",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0111",
                "title": "A6 상가",
                "color": "#F97932",
                "show": "false"
            }, {
                "id": "B0112",
                "title": "B9 상가",
                "color": "#F97932",
                "show": "false"
            }],
    "levels": [
        {
            "id": "A",
            "title": "A구역",
            "map": "/m/map/speed_map.svg",
            "minimap": "/map/images/mall/kiosk_map.jpg",
            "locations": [{
        "id": "B_0063_000",
        "title": "곡천빌딩",
        "about": "곡천빌딩",
        "category": "B0063",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 23",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0063_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6015",
        "y": "0.0671"
    },{
        "id": "M_0026_000",
        "title": "골드귀금속타운",
        "about": "골드귀금속타운",
        "category": "M0026",
        "description": "주소 :서울특별시 종로구 돈화문로 36",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0026_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4234",
        "y": "0.4724"
    },{
        "id": "B_0001_000",
        "title": "골드뱅크",
        "about": "골드뱅크",
        "category": "B0001",
        "description": "주소 :서울특별시 종로구 돈화문로 6길 19",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0001_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6765",
        "y": "0.7446"
    },{
        "id": "B_0085_000",
        "title": "골드타운",
        "about": "골드타운",
        "category": "B0085",
        "description": "주소 :서울특별시 종로구 서순라길 35",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0085_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7177",
        "y": "0.2941"
    },{
        "id": "B_0002_000",
        "title": "골든타워",
        "about": "골든타워",
        "category": "B0002",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길12",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0002_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5954",
        "y": "0.5923"
    },{
        "id": "B_0007_000",
        "title": "광은상가",
        "about": "광은상가",
        "category": "B0007",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0007_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6116",
        "y": "0.7505"
    },{
        "id": "B_0034_000",
        "title": "금강귀금속",
        "about": "금강귀금속",
        "category": "B0034",
        "description": "주소 :서울특별시 종로구 돈화문로6나길 35",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0034_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5454",
        "y": "0.3897"
    },{
        "id": "M_0017_000",
        "title": "금강쥬얼리",
        "about": "금강쥬얼리",
        "category": "M0017",
        "description": "주소 :서울특별시 종로구 돈화문로8길 4",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0017_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4762",
        "y": "0.5863"
    },{
        "id": "B_0010_000",
        "title": "금밭상가",
        "about": "금밭상가",
        "category": "B0010",
        "description": "주소 :서울특별시 종로구 돈화문로6가길 24",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0010_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5145",
        "y": "0.4056"
    },{
        "id": "M_0011_000",
        "title": "금사랑상가",
        "about": "금사랑상가",
        "category": "M0011",
        "description": "주소 :서울특별시 종로구 돈화문로 8길10",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0011_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4604",
        "y": "0.4764"
    },{
        "id": "B_0075_000",
        "title": "금사랑투",
        "about": "금사랑투",
        "category": "B0075",
        "description": "주소 :서울특별시 종로구 서순라길17-10",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0075_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7246",
        "y": "0.4155"
    },{
        "id": "M_0029_000",
        "title": "금성빌딩",
        "about": "금성빌딩",
        "category": "M0029",
        "description": "주소 :서울특별시 종로구 돈화문로 41",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0029_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.3081",
        "y": "0.2805"
    },{
        "id": "B_0096_000",
        "title": "금은빌딩",
        "about": "금은빌딩",
        "category": "B0096",
        "description": "주소 :서울특별시 종로구 서순라길 7",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0096_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7551",
        "y": "0.7293"
    },{
        "id": "B_0031_000",
        "title": "금정빌딩(별관)",
        "about": "금정빌딩(별관)",
        "category": "B0031",
        "description": "주소 :서울특별시 종로구 돈화문로6나길 28-5",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0031_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5601",
        "y": "0.2678"
    },{
        "id": "B_0015_000",
        "title": "금정상가",
        "about": "금정상가",
        "category": "B0015",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 6",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0015_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6066",
        "y": "0.6863"
    },{
        "id": "M_0006_000",
        "title": "금탑주얼리",
        "about": "금탑주얼리",
        "category": "M0006",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길23",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0006_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4747",
        "y": "0.4496"
    },{
        "id": "D_0002_000",
        "title": "다이아몬드빌딩",
        "about": "다이아몬드빌딩",
        "category": "D0002",
        "description": "주소 :서울특별시 종로구 돈화문로 5길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/D_0002_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.1904",
        "y": "0.7927"
    },{
        "id": "B_0017_000",
        "title": "대광상가",
        "about": "대광상가",
        "category": "B0017",
        "description": "주소 :서울특별시 종로구 돈화문로 6길 17",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0017_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6498",
        "y": "0.7450"
    },{
        "id": "B_0028_000",
        "title": "대림상가",
        "about": "대림상가",
        "category": "B0028",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 25",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0028_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6353",
        "y": "0.4720"
    },{
        "id": "E_0048_000",
        "title": "대보귀금속도매백화점",
        "about": "대보귀금속도매백화점",
        "category": "E0048",
        "description": "주소 :서울특별시 종로구 종로143-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0048_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7431",
        "y": "0.8194"
    },{
        "id": "B_0076_000",
        "title": "대성귀금속",
        "about": "대성귀금속",
        "category": "B0076",
        "description": "주소 :서울특별시 종로구 서순라길 17-13",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0076_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6626",
        "y": "0.4142"
    },{
        "id": "B_0080_000",
        "title": "대성빌딩",
        "about": "대성빌딩",
        "category": "B0080",
        "description": "주소 :서울특별시 종로구 서순라길 17-21",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0080_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6729",
        "y": "0.2654"
    },{
        "id": "B_0011_000",
        "title": "대성주얼리",
        "about": "대성주얼리",
        "category": "B0011",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 28",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0011_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5025",
        "y": "0.3717"
    },{
        "id": "B_0100_000",
        "title": "대화상가",
        "about": "대화상가",
        "category": "B0100",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길7-2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0100_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6914",
        "y": "0.6580"
    },{
        "id": "B_0042_000",
        "title": "동양과학빌딩",
        "about": "동양과학빌딩",
        "category": "B0042",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 7-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0042_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6811",
        "y": "0.7118"
    },{
        "id": "B_0003_000",
        "title": "동양귀금속",
        "about": "동양귀금속",
        "category": "B0003",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 11",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0003_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6767",
        "y": "0.6098"
    },{
        "id": "B_0098_000",
        "title": "디아망",
        "about": "디아망",
        "category": "B0098",
        "description": "주소 :서울특별시 종로구 율곡로 10길105",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0098_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4539",
        "y": "0.0336"
    },{
        "id": "M_0028_000",
        "title": "럭키귀금속",
        "about": "럭키귀금속",
        "category": "M0028",
        "description": "주소 :서울특별시 종로구 돈화문로 8길19",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0028_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4033",
        "y": "0.3314"
    },{
        "id": "M_0002_000",
        "title": "로얄귀금속",
        "about": "로얄귀금속",
        "category": "M0002",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 12",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0002_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5298",
        "y": "0.6350"
    },{
        "id": "M_0013_000",
        "title": "명품주얼리",
        "about": "명품주얼리",
        "category": "M0013",
        "description": "주소 :서울특별시 종로구 돈화문로 8길 16",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0013_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4594",
        "y": "0.3808"
    },{
        "id": "B_0047_000",
        "title": "모란귀금속",
        "about": "모란귀금속",
        "category": "B0047",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 6",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0047_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6545",
        "y": "0.6060"
    },{
        "id": "E_0001_000",
        "title": "미도빌딩",
        "about": "미도빌딩",
        "category": "E0001",
        "description": "주소 :",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0001_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4128",
        "y": "0.3765"
    },{
        "id": "B_0040_000",
        "title": "보석백화점",
        "about": "보석백화점",
        "category": "B0040",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 45",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0040_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4711",
        "y": "0.2136"
    },{
        "id": "B_0022_000",
        "title": "보성귀금속",
        "about": "보성귀금속",
        "category": "B0022",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 14-4",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0022_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7423",
        "y": "0.5406"
    },{
        "id": "M_0034_000",
        "title": "삼보빌딩",
        "about": "삼보빌딩",
        "category": "M0034",
        "description": "주소 :서울특별시 종로구 율곡로 8길101",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160525123207.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.3949",
        "y": "0.0469"
    },{
        "id": "B_0018_000",
        "title": "삼보상가",
        "about": "삼보상가",
        "category": "B0018",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 23",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0018_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7162",
        "y": "0.7541"
    },{
        "id": "B_0061_000",
        "title": "삼삼쥬얼리",
        "about": "삼삼쥬얼리",
        "category": "B0061",
        "description": "주소 :서울특별시 종로구 돈화문로10길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0061_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5921",
        "y": "0.2627"
    },{
        "id": "B_0045_000",
        "title": "삼성귀금속",
        "about": "삼성귀금속",
        "category": "B0045",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 9-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0045_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6774",
        "y": "0.6619"
    },{
        "id": "M_0004_000",
        "title": "삼영귀금속",
        "about": "삼영귀금속",
        "category": "M0004",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 17",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0004_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5062",
        "y": "0.5383"
    },{
        "id": "M_0019_000",
        "title": "삼영귀금속도매상가",
        "about": "삼영귀금속도매상가",
        "category": "M0019",
        "description": "주소 :서울특별시 종로구 돈화문로 8길 6",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0019_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4689",
        "y": "0.5330"
    },{
        "id": "B_0008_000",
        "title": "삼영빌딩",
        "about": "삼영빌딩",
        "category": "B0008",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0008_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5258",
        "y": "0.4817"
    },{
        "id": "M_0015_000",
        "title": "삼오빌딩",
        "about": "삼오빌딩",
        "category": "M0015",
        "description": "주소 :서울특별시 종로구 돈화문로 8길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0015_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4255",
        "y": "0.2750"
    },{
        "id": "B_0101_000",
        "title": "삼오재료상사",
        "about": "삼오재료상사",
        "category": "B0101",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0101_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7215",
        "y": "0.4854"
    },{
        "id": "M_0016_000",
        "title": "수안빌딩",
        "about": "수안빌딩",
        "category": "M0016",
        "description": "주소 :서울특별시 종로구 돈화문로 8길 26",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0016_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4151",
        "y": "0.1922"
    },{
        "id": "B_0081_000",
        "title": "삼정금은",
        "about": "삼정금은",
        "category": "B0081",
        "description": "주소 :서울특별시 종로구 돈화문로6가길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0081_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7583",
        "y": "0.4914"
    },{
        "id": "E_0037_000",
        "title": "서울귀금속도매상가",
        "about": "서울귀금속도매상가",
        "category": "E0037",
        "description": "주소 :서울특별시 종로구 종로 133",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0037_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4981",
        "y": "0.8331"
    },{
        "id": "B_0020_000",
        "title": "서울귀금속상가",
        "about": "서울귀금속상가",
        "category": "B0020",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길13",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0020_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6651",
        "y": "0.5838"
    },{
        "id": "B_0024_000",
        "title": "서울쥬얼리",
        "about": "서울쥬얼리",
        "category": "B0024",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 15-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0024_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6324",
        "y": "0.5356"
    },{
        "id": "M_0008_000",
        "title": "서진빌딩",
        "about": "서진빌딩",
        "category": "M0008",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길33",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0008_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4473",
        "y": "0.2623"
    },{
        "id": "B_0027_000",
        "title": "성보귀금속",
        "about": "성보귀금속",
        "category": "B0027",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 22-4",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0027_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6963",
        "y": "0.4548"
    },{
        "id": "B_0004_000",
        "title": "성창귀금속",
        "about": "성창귀금속",
        "category": "B0004",
        "description": "주소 :서울특별시 종로구 서순라길 17",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0004_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7535",
        "y": "0.5657"
    },{
        "id": "B_0006_000",
        "title": "세화상가",
        "about": "세화상가",
        "category": "B0006",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 16",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0006_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5864",
        "y": "0.5233"
    },{
        "id": "M_0003_000",
        "title": "스타귀금속",
        "about": "스타귀금속",
        "category": "M0003",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 13",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0003_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5271",
        "y": "0.6055"
    },{
        "id": "B_0060_000",
        "title": "신광빌딩",
        "about": "신광빌딩",
        "category": "B0060",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 18",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0060_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5495",
        "y": "0.1833"
    },{
        "id": "B_0021_000",
        "title": "썬쥬얼리",
        "about": "썬쥬얼리",
        "category": "B0021",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 14-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0021_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6937",
        "y": "0.5091"
    },{
        "id": "B_0074_000",
        "title": "아트귀금속",
        "about": "아트귀금속",
        "category": "B0074",
        "description": "주소 :서울특별시 종로구 서순라길15",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0074_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7557",
        "y": "0.6025"
    },{
        "id": "B_0036_000",
        "title": "엄지귀금속",
        "about": "엄지귀금속",
        "category": "B0036",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 37",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0036_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5283",
        "y": "0.3575"
    },{
        "id": "B_0033_000",
        "title": "에메랄드하우스",
        "about": "에메랄드하우스",
        "category": "B0033",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 34",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0033_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5741",
        "y": "0.3596"
    },{
        "id": "B_0019_000",
        "title": "에이스상가",
        "about": "에이스상가",
        "category": "B0019",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 10",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0019_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7392",
        "y": "0.6133"
    },{
        "id": "B_0029_000",
        "title": "영동빌딩",
        "about": "영동빌딩",
        "category": "B0029",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 28",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0029_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6238",
        "y": "0.3114"
    },{
        "id": "E_0046_000",
        "title": "영보귀금속상가",
        "about": "영보귀금속상가",
        "category": "E0046",
        "description": "주소 :서울특별시 종로구 종로141-3",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0046_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7041",
        "y": "0.8227"
    },{
        "id": "B_0084_000",
        "title": "영보빌딩",
        "about": "영보빌딩",
        "category": "B0084",
        "description": "주소 :서울특별시 종로구 서순라길27-5",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0084_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7015",
        "y": "0.3532"
    },{
        "id": "B_0068_000",
        "title": "온녕빌딩",
        "about": "온녕빌딩",
        "category": "B0068",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 9",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0068_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4754",
        "y": "0.0703"
    },{
        "id": "E_0039_000",
        "title": "우리귀금속도매상가",
        "about": "우리귀금속도매상가",
        "category": "E0039",
        "description": "주소 :서울특별시 종로구 종로135",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0039_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5424",
        "y": "0.8339"
    },{
        "id": "M_0023_000",
        "title": "우신보석상가",
        "about": "우신보석상가",
        "category": "M0023",
        "description": "주소 :서울특별시 종로구 돈화문로 32-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0023_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4348",
        "y": "0.5473"
    },{
        "id": "M_0018_000",
        "title": "원귀금속",
        "about": "원귀금속",
        "category": "M0018",
        "description": "주소 :서울특별시 종로구 돈화문로 8길4-5",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0018_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4994",
        "y": "0.5806"
    },{
        "id": "E_0047_000",
        "title": "월드귀금속도매백화점",
        "about": "월드귀금속도매백화점",
        "category": "E0047",
        "description": "주소 :서울특별시 종로구 종로143",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0047_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7226",
        "y": "0.8194"
    },{
        "id": "M_0035_000",
        "title": "유금빌딩",
        "about": "유금빌딩",
        "category": "M0035",
        "description": "주소 :서울특별시 종로구 돈화문로 8길 24",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160525123059.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4190",
        "y": "0.2261"
    },{
        "id": "E_0035_000",
        "title": "일번지 귀금속",
        "about": "일번지 귀금속",
        "category": "E0035",
        "description": "주소 :서울특별시 종로구 돈화문로24",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0035_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4686",
        "y": "0.8299"
    },{
        "id": "B_0030_000",
        "title": "제일귀금속 도매상가",
        "about": "제일귀금속 도매상가",
        "category": "B0030",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 46",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0030_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5088",
        "y": "0.2399"
    },{
        "id": "B_0012_000",
        "title": "조웅빌딩",
        "about": "조웅빌딩",
        "category": "B0012",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 30",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160525123037.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4869",
        "y": "0.3424"
    },{
        "id": "E_0042_000",
        "title": "조흥귀금속도매상가",
        "about": "조흥귀금속도매상가",
        "category": "E0042",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0042_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6188",
        "y": "0.8233"
    },{
        "id": "E_0040_000",
        "title": "종로3가 귀금속도매백화점",
        "about": "종로3가 귀금속도매백화점",
        "category": "E0040",
        "description": "주소 :서울특별시 종로구 종로137",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0040_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5745",
        "y": "0.8259"
    },{
        "id": "M_0001_000",
        "title": "종로주얼리타운",
        "about": "종로주얼리타운",
        "category": "M0001",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0001_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.3790",
        "y": "0.2113"
    },{
        "id": "E_0043_000",
        "title": "종로타운",
        "about": "종로타운",
        "category": "E0043",
        "description": "주소 :서울특별시 종로구 종로139-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0043_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6488",
        "y": "0.8219"
    },{
        "id": "B_0077_000",
        "title": "종묘빌딩",
        "about": "종묘빌딩",
        "category": "B0077",
        "description": "주소 :서울특별시 종로구 서순라길 17-14",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0077_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6801",
        "y": "0.3778"
    },{
        "id": "E_0038_000",
        "title": "중앙귀금속상가",
        "about": "중앙귀금속상가",
        "category": "E0038",
        "description": "주소 :서울특별시 종로구 종로135",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0038_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5181",
        "y": "0.8339"
    },{
        "id": "M_0031_000",
        "title": "중앙빌딩",
        "about": "중앙빌딩",
        "category": "M0031",
        "description": "주소 :서울특별시 종로구 돈화문로 9길 2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160525123133.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.3225",
        "y": "0.3467"
    },{
        "id": "B_0026_000",
        "title": "쥬벨빌딩",
        "about": "쥬벨빌딩",
        "category": "B0026",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 22",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0026_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6640",
        "y": "0.4653"
    },{
        "id": "B_0073_000",
        "title": "쥬얼리파크",
        "about": "쥬얼리파크",
        "category": "B0073",
        "description": "주소 :서울특별시 종로구 서순라길 11",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0073_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7517",
        "y": "0.6424"
    },{
        "id": "B_0066_000",
        "title": "지성빌딩",
        "about": "지성빌딩",
        "category": "B0066",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 26",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0066_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6362",
        "y": "0.1746"
    },{
        "id": "M_0009_000",
        "title": "진주빌딩",
        "about": "진주빌딩",
        "category": "M0009",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 35",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0009_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4417",
        "y": "0.2384"
    },{
        "id": "B_0037_000",
        "title": "진쥬얼리",
        "about": "진쥬얼리",
        "category": "B0037",
        "description": "주소 :서울특별시 종로구 돈화문로 6길 39",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0037_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5058",
        "y": "0.3119"
    },{
        "id": "M_0027_000",
        "title": "청룡귀금속",
        "about": "청룡귀금속",
        "category": "M0027",
        "description": "주소 :서울특별시 종로구 돈화문로36-1, 돈화문로38",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0027_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4178",
        "y": "0.4285"
    },{
        "id": "E_0041_000",
        "title": "코리아주얼랜드",
        "about": "코리아주얼랜드",
        "category": "E0041",
        "description": "주소 :서울특별시 종로구 종로137-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0041_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5977",
        "y": "0.8243"
    },{
        "id": "M_0033_000",
        "title": "탑귀금속",
        "about": "탑귀금속",
        "category": "M0033",
        "description": "주소 :서울특별시 종로구 돈화문로 8길4-6",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0033_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4961",
        "y": "0.6227"
    },{
        "id": "B_0044_000",
        "title": "태일귀금속",
        "about": "태일귀금속",
        "category": "B0044",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 7-3",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0044_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6507",
        "y": "0.6911"
    },{
        "id": "M_0022_000",
        "title": "토보에",
        "about": "토보에",
        "category": "M0022",
        "description": "주소 :서울특별시 종로구 돈화문로 32",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0022_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4437",
        "y": "0.6136"
    },{
        "id": "B_0016_000",
        "title": "티파니",
        "about": "티파니",
        "category": "B0016",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 8",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0016_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5992",
        "y": "0.6415"
    },{
        "id": "D_0001_000",
        "title": "피카디리플러스",
        "about": "피카디리플러스",
        "category": "D0001",
        "description": "주소 :서울특별시 종로구 돈화문로 5가길1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/D_0001_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.2651",
        "y": "0.7147"
    },{
        "id": "B_0078_000",
        "title": "하나로귀금속",
        "about": "하나로귀금속",
        "category": "B0078",
        "description": "주소 :서울특별시 종로구 서순라길 17-15",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0078_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6536",
        "y": "0.3392"
    },{
        "id": "B_0035_000",
        "title": "하나빌딩",
        "about": "하나빌딩",
        "category": "B0035",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길36",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0035_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5532",
        "y": "0.3214"
    },{
        "id": "M_0032_000",
        "title": "한국금거래소빌딩",
        "about": "한국금거래소빌딩",
        "category": "M0032",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0032_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.3249",
        "y": "0.4027"
    },{
        "id": "M_0025_000",
        "title": "한미귀금속",
        "about": "한미귀금속",
        "category": "M0025",
        "description": "주소 :서울특별시 종로구 돈화문로 34",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0025_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4304",
        "y": "0.5048"
    },{
        "id": "E_0044_000",
        "title": "한양타운",
        "about": "한양타운",
        "category": "E0044",
        "description": "주소 :서울특별시 종로구 종로141",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0044_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6699",
        "y": "0.8217"
    },{
        "id": "B_0046_000",
        "title": "한일귀금속",
        "about": "한일귀금속",
        "category": "B0046",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 9-3",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0046_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6509",
        "y": "0.6530"
    },{
        "id": "B_0032_000",
        "title": "한진빌딩",
        "about": "한진빌딩",
        "category": "B0032",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 3",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0032_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7043",
        "y": "0.7076"
    },{
        "id": "E_0036_000",
        "title": "행복귀금속",
        "about": "행복귀금속",
        "category": "E0036",
        "description": "주소 :서울특별시 종로구 종로131",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0036_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4871",
        "y": "0.8323"
    },{
        "id": "B_0023_000",
        "title": "현대귀금속",
        "about": "현대귀금속",
        "category": "B0023",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길15",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0023_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6542",
        "y": "0.5617"
    },{
        "id": "E_0045_000",
        "title": "현대귀금속프라자",
        "about": "현대귀금속프라자",
        "category": "E0045",
        "description": "주소 :서울특별시 종로구 종로141-2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0045_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6931",
        "y": "0.8162"
    },{
        "id": "B_0009_000",
        "title": "황금송아지",
        "about": "황금송아지",
        "category": "B0009",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 22",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0009_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5280",
        "y": "0.4258"
    },{
        "id": "M_0012_000",
        "title": "황룡귀금속",
        "about": "황룡귀금속",
        "category": "M0012",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0012_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4418",
        "y": "0.4382"
    },{
        "id": "M_0005_000",
        "title": "A1 상가",
        "about": "A1 상가",
        "category": "M0005",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 21",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0005_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4859",
        "y": "0.4779"
    },{
        "id": "M_0007_000",
        "title": "A2 상가",
        "about": "A2 상가",
        "category": "M0007",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 29",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0007_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4558",
        "y": "0.3451"
    },{
        "id": "M_0010_000",
        "title": "A4 상가",
        "about": "A4 상가",
        "category": "M0010",
        "description": "주소 :서울특별시 종로구 돈화문로 6가길 37",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0010_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4358",
        "y": "0.2112"
    },{
        "id": "E_0004_000",
        "title": "A5 상가",
        "about": "A5 상가",
        "category": "E0004",
        "description": "주소 :서울특별시 종로구 돈화문로 8길 18",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0004_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4314",
        "y": "0.1831"
    },{
        "id": "B_0013_000",
        "title": "B1 상가",
        "about": "B1 상가",
        "category": "B0013",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 32",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0013_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4769",
        "y": "0.3015"
    },{
        "id": "B_0039_000",
        "title": "B2 상가",
        "about": "B2 상가",
        "category": "B0039",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 41",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0039_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4906",
        "y": "0.2931"
    },{
        "id": "B_0038_000",
        "title": "B8 상가",
        "about": "B8 상가",
        "category": "B0038",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 40",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0038_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5255",
        "y": "0.2907"
    },{
        "id": "C_0001_000",
        "title": "C1 상가",
        "about": "C1 상가",
        "category": "C0001",
        "description": "주소 :서울특별시 종로구 종로구 서순라길 17-5",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/C_0001_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6369",
        "y": "0.3882"
    },{
        "id": "B_0062_000",
        "title": "C3 상가",
        "about": "C3 상가",
        "category": "B0062",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 20-2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0062_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5847",
        "y": "0.1729"
    },{
        "id": "B_0064_000",
        "title": "C5 상가",
        "about": "C5 상가",
        "category": "B0064",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 24",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0064_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6196",
        "y": "0.1705"
    },{
        "id": "B_0067_000",
        "title": "C6 상가",
        "about": "C6 상가",
        "category": "B0067",
        "description": "주소 :서울특별시 종로구 돈화문로 10길 28",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0067_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6572",
        "y": "0.1693"
    },{
        "id": "B_0093_000",
        "title": "C7 상가",
        "about": "C7 상가",
        "category": "B0093",
        "description": "주소 :서울특별시 종로구 서순라길43-4",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0093_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6420",
        "y": "0.2016"
    },{
        "id": "B_0088_000",
        "title": "C8 상가",
        "about": "C8 상가",
        "category": "B0088",
        "description": "주소 :서울특별시 종로구 서순라길43-12",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0088_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6039",
        "y": "0.1908"
    },{
        "id": "B_0094_000",
        "title": "C10 상가",
        "about": "C10 상가",
        "category": "B0094",
        "description": "주소 :서울특별시 종로구 서순라길43-6",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0094_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6090",
        "y": "0.2411"
    },{
        "id": "B_0089_000",
        "title": "C11 상가",
        "about": "C11 상가",
        "category": "B0089",
        "description": "주소 :서울특별시 종로구 서순라길43-14",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0089_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6165",
        "y": "0.2166"
    },{
        "id": "B_0090_000",
        "title": "C12 상가",
        "about": "C12 상가",
        "category": "B0090",
        "description": "주소 :서울특별시 종로구 서순라길43-16",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0090_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6231",
        "y": "0.2572"
    },{
        "id": "B_0091_000",
        "title": "C13 상가",
        "about": "C13 상가",
        "category": "B0091",
        "description": "주소 :서울특별시 종로구 서순라길 43-18",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0091_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6408",
        "y": "0.2794"
    },{
        "id": "B_0092_000",
        "title": "C14 상가",
        "about": "C14 상가",
        "category": "B0092",
        "description": "주소 :서울특별시 종로구 서순라길 43-20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0092_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6502",
        "y": "0.2973"
    },{
        "id": "B_0095_000",
        "title": "C15 상가",
        "about": "C15 상가",
        "category": "B0095",
        "description": "주소 :서울특별시 종로구 서순라길 43-7",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0095_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6545",
        "y": "0.2315"
    },{
        "id": "B_0087_000",
        "title": "C16 상가",
        "about": "C16 상가",
        "category": "B0087",
        "description": "주소 :서울특별시 종로구 서순라길 41",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160607185111.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6823",
        "y": "0.2100"
    },{
        "id": "B_0086_000",
        "title": "C17 상가",
        "about": "C17 상가",
        "category": "B0086",
        "description": "주소 :서울특별시 종로구 서순라길39",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0086_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6988",
        "y": "0.2447"
    },{
        "id": "B_0041_000",
        "title": "D1 상가",
        "about": "D1 상가",
        "category": "B0041",
        "description": "주소 :서울특별시 종로구 돈화문로 6나길 6",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0041_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7309",
        "y": "0.6861"
    },{
        "id": "B_0082_000",
        "title": "D5 상가",
        "about": "D5 상가",
        "category": "B0082",
        "description": "주소 :서울특별시 종로구 서순라길 23-4",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0082_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7278",
        "y": "0.4516"
    },{
        "id": "E_0033_000",
        "title": "D8 상가",
        "about": "D8 상가",
        "category": "E0033",
        "description": "주소 :서울특별시 종로구 서순라길 25",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/E_0033_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.7576",
        "y": "0.4193"
    },{
        "id": "M_0036_000",
        "title": "F1 상가",
        "about": "F1 상가",
        "category": "M0036",
        "description": "주소 :서울특별시 종로구 율곡로 10길108",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/M_0036_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4114",
        "y": "0.0803"
    },{
        "id": "B_0059_000",
        "title": "F2 상가",
        "about": "F2 상가",
        "category": "B0059",
        "description": "주소 :서울특별시 종로구 돈화문로10길 17",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0059_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5219",
        "y": "0.0846"
    },{
        "id": "B_0052_000",
        "title": "F3 상가",
        "about": "F3 상가",
        "category": "B0052",
        "description": "주소 :서울특별시 종로구 돈화문로10가길 2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/B_0052_000.png",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5628",
        "y": "0.0901"
    },{
        "id": "B_0104_000",
        "title": "A9 상가",
        "about": "A9 상가",
        "category": "B0104",
        "description": "주소 :서울시 종로구 돈화문로 38-1",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160524102102.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.3997",
        "y": "0.4080"
    },{
        "id": "B_0105_000",
        "title": "A8 상가",
        "about": "A8 상가",
        "category": "B0105",
        "description": "주소 :서울시 종로구 돈화문로 38-2",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160524120619.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.3946",
        "y": "0.3817"
    },{
        "id": "B_0106_000",
        "title": "B6 상가",
        "about": "B6 상가",
        "category": "B0106",
        "description": "주소 :서울시 종로구 돈화문로 10길 16",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160524131155.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5273",
        "y": "0.2015"
    },{
        "id": "B_0107_000",
        "title": "D4 상가",
        "about": "D4 상가",
        "category": "B0107",
        "description": "주소 :서울시 종로구 서순라길 17-20",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160531152734.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.6908",
        "y": "0.3437"
    },{
        "id": "B_0108_000",
        "title": "금성쥬얼리",
        "about": "금성쥬얼리",
        "category": "B0108",
        "description": "주소 :서울특별시 종로구 돈화문로6가길 25",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160608164103.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4706",
        "y": "0.4272"
    },{
        "id": "B_0109_000",
        "title": "기타",
        "about": "기타",
        "category": "B0109",
        "description": "주소 :",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/blank_tower",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "",
        "y": ""
    },{
        "id": "B_0110_000",
        "title": "단성골드주얼리센터",
        "about": "단성골드주얼리센터",
        "category": "B0110",
        "description": "주소 :서울시 종로구 돈화문로 26",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG160909164854.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5183",
        "y": "0.7386"
    },{
        "id": "B_0111_000",
        "title": "A6 상가",
        "about": "A6 상가",
        "category": "B0111",
        "description": "주소 :",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/IMG161014141918.jpg",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.4335",
        "y": "0.3437"
    },{
        "id": "B_0112_000",
        "title": "B9 상가",
        "about": "B9 상가",
        "category": "B0112",
        "description": "주소 :서울 종로구 돈화문로10길 16",
        "image": "http://jmap.unifor.co.kr/fileupdown/building/blank_tower",					
        "thumbnail": "/map/images/thumbs/size_icon-jewelry.png",
        "zoom":"3", 
        "x": "0.5290",
        "y": "0.1776"
    }]
        }
    ]
}