package com.dandj.jtoday.entity.price;

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
public class PriceSubu extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 2)
    // 01: 화이트계열, 02: 컬러1부이하, 03 러프색상
    private String typ;
    private Double mm;
    private Long price1;
    private Long price2;
    private Long price3;
    private Long price4;
    private Long price5;
}
