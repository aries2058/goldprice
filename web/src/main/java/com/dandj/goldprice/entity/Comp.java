package com.dandj.goldprice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comp extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String placeNm;

    @Column(length = 20)
    private String tel;

    @Column(length = 500)
    private String imgUrl;

    @Column(length = 2000)
    private String contents;

    @Column(length = 1)
    private String useYn;

    @Column(length = 500, nullable = false)
    private String addr;
    @Column(length = 500, nullable = false)
    private String addrDetail;

    private Double lat;
    private Double lng;
    private String userId;
}
