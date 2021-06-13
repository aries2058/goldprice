package com.dandj.jtoday.entity.price;

import com.dandj.jtoday.entity.comm.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PricePearl extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 01: 담수 귀걸이용(나석), 02: 담수 목걸이용(비드), 03: 해수 귀걸이용(나석), 04: 해수 목걸이용(비드)
    private String typ;
    private Double mm;
    private Long min;
    private Long max;
}
