package com.dandj.jtoday.repository.market;

import com.dandj.jtoday.entity.market.MarketMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MarketMapRepository extends JpaRepository<MarketMap, Long> {
    Optional<MarketMap> findMarketByAddr(String addr);
    Optional<MarketMap> findMarketByBuildingCode(String buildingCode);
}
