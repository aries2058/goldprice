package com.dandj.jtoday.repository.market;

import com.dandj.jtoday.entity.market.Market;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketRepository extends JpaRepository<Market, Long> {
    Market findCompByUserId(String userId);
}
