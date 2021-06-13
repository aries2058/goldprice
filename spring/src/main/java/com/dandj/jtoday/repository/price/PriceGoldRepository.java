package com.dandj.jtoday.repository.price;

import com.dandj.jtoday.entity.price.PriceGold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PriceGoldRepository extends JpaRepository<PriceGold, Long> {
    Optional<List<PriceGold>> findPriceGoldByTypOrderByRegDateDesc(String typ);
}
