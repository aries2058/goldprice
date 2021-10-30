package com.dandj.jtoday.dto.market;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MarketMapDto {
    private Long id;
    private String place_nm;
    private String addr;
    private String addr_detail;
    private Double lat;
    private Double lng;
    private String building_code;
    private String use_yn;
    private List<MarketDto> market;
}
