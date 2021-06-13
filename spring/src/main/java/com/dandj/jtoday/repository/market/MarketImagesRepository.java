package com.dandj.jtoday.repository.market;

import com.dandj.jtoday.entity.market.MarketImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MarketImagesRepository extends JpaRepository<MarketImages, Long> {
    Optional<List<MarketImages>> findMarketImagesByMarketId(Long id);
}
