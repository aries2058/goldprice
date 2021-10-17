package com.dandj.jtoday.repository.market;

import com.dandj.jtoday.entity.market.MarketImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MarketImagesRepository extends JpaRepository<MarketImages, Long> {
    Optional<List<MarketImages>> findMarketImagesByMarketId(Long id);
    @Query(value = "select max(path) from market_images m join images i on m.image_id = i.id where m.market_id = :id group by m.market_id", nativeQuery = true)
    String findMarketImageByMarketId(Long id);
}
