package com.dandj.jtoday.entity.market;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class MarketMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String placeNm;

    @Column(length = 500, nullable = false)
    private String addr;

    @Column(length = 500, nullable = false)
    private String addrDetail;

    @Column(length = 1)
    private String useYn;

    private Double lat;
    private Double lng;
}
