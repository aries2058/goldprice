package com.dandj.jtoday.entity.market;

import com.dandj.jtoday.entity.comm.BaseEntity;
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
public class Market extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String placeNm;

    @Column(length = 20)
    private String tel;

    private Long imageId;

    @Column(length = 2000)
    private String contents;

    @Column(length = 1)
    private String delYn;

    @Column(length = 500, nullable = false)
    private String addr;
    @Column(length = 500, nullable = false)
    private String addrDetail;

    private Double lat;
    private Double lng;
    private String userId;
}
