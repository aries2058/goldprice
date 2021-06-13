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
public class PriceGoldDto {
    private Long price_id;
    private String typ;
    private Long vat;
    private Long buy;
    private Long sell;
    private LocalDateTime regdt;
}
