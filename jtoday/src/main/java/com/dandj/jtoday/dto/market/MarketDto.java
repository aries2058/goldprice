package com.dandj.jtoday.dto.market;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MarketDto {
    private Long comp_id;
    private String place_nm;
    private String addr;
    private String addrDetail;
    private Double lat;
    private Double lng;
    private String tel;
    private String imgUrl;
    private String contents;
    private String user_id;
}
