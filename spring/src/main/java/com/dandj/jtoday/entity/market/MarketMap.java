package com.dandj.jtoday.entity.market;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
