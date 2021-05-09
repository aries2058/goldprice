package com.dandj.goldprice.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CompDto {
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
