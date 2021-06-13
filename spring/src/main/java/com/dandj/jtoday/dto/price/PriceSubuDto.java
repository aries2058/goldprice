package com.dandj.jtoday.dto.price;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PriceSubuDto {
    private Long subu_id;
    private String typ;
    private Double mm;
    private Long price1;
    private Long price2;
    private Long price3;
    private Long price4;
    private Long price5;
    private LocalDateTime regdt;
}
