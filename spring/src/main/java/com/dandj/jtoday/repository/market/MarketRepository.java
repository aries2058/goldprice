package com.dandj.jtoday.repository.market;

import com.dandj.jtoday.entity.market.Market;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MarketRepository extends JpaRepository<Market, Long> {
    Optional<Market> findMarketById(Long id);
    Optional<Market> findMarketByMapId(Long id);
    Optional<List<Market>> findMarketsByMapId(Long id);

    Optional<List<Market>> findMarketsByHotYn(String hotyn);
    Optional<List<Market>> findMarketsBy(Pageable pageable);
    Page<Market> findAll(Specification<Market> spec, Pageable pageable);

}
