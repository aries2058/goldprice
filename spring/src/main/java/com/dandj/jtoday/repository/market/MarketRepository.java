package com.dandj.jtoday.repository.market;

import com.dandj.jtoday.entity.market.Market;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MarketRepository extends JpaRepository<Market, Long> {
    Optional<Market> findMarketById(Long id);
    Optional<Market> findMarketByMapId(Long id);
    Optional<List<Market>> findMarketsByMapId(Long id);
}
