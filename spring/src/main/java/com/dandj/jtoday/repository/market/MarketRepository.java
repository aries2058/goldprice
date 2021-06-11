package com.dandj.jtoday.repository.market;

import com.dandj.jtoday.entity.market.Market;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MarketRepository extends JpaRepository<Market, Long> {
    Optional<Market> findMarketByUserId(String userId);
}
