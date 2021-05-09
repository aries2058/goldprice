package com.dandj.goldprice.dto;

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
    private String tel;
    private String imgUrl;
}
