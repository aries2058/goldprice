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
public class PriceDiaDto {
    private Long dia_id;
    private String app;
    private String color;
    private String cut;
    private String level;
    private Double ct;
    private Long price;
    private LocalDateTime regdt;
}
