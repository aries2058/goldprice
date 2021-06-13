package com.dandj.jtoday.dto.market;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MarketImageDto {
    private Long id;
    private Long image_id;
    private Long market_id;
    private String delYn;
}
