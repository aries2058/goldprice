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
public class PricePearlDto {
    private Long pearl_id;
    private String typ;
    private Double mm;
    private Long min;
    private Long max;
    private LocalDateTime regdt;
}
