package com.dandj.goldprice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MapInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapInfoId;

    @Column(length = 100, nullable = false)
    private String placeNm;

    @Column(length = 500, nullable = false)
    private String addr;

    private Double lat;
    private Double lng;
}
