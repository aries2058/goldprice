package com.dandj.goldprice.entity;

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
public class PriceDia extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20)
    private String app;
    @Column(length = 20)
    private String level;
    @Column(length = 20)
    private String cut;
    @Column(length = 20)
    private String color;
    private Double ct;
    private Long price;
}
