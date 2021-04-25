package com.dandj.goldprice.dto;

import com.dandj.goldprice.entity.MapInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MapInfoDto {
    private Long id;
    private String place_nm;
    private String addr;
    private Double lat;
    private Double lng;


    private MapInfoDto toDTO(MapInfo entity){
        MapInfoDto dto = MapInfoDto.builder()
                .id(entity.getMapInfoId())
                .place_nm(entity.getPlaceNm())
                .addr(entity.getAddr())
                .lat(entity.getLat())
                .lng(entity.getLng()).build();
        return dto;
    }
}
