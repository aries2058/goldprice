package com.dandj.jtoday.dto.market;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MarketDto {
    private Long id;
    private String market_nm;
    private String biz_no;
    private String addr;
    private String addr_detail;
    private String tel;
    private String email;
    private String contents;
    private String image_path;
    private Long map_id;
    private String writer;
    private LocalDateTime regdt;
    private LocalDateTime moddt;
    private String market_typ;
    private String item_typ;

    private String link_kakao;
    private String link_goldpen;
    private String link_sns;
    private String link_homepage;

    private Double lat;
    private Double lng;

    private String hot_yn;
    @Builder.Default
    private List<Long> image_ids = new ArrayList<>();
}
