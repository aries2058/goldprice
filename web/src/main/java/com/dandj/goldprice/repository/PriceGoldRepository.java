package com.dandj.goldprice.repository;

import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.PriceGold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PriceGoldRepository extends JpaRepository<PriceGold, Long> {
}
