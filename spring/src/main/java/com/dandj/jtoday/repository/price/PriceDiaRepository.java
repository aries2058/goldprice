package com.dandj.jtoday.repository.price;

import com.dandj.jtoday.entity.price.PriceDia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PriceDiaRepository extends JpaRepository<PriceDia, Long> {
}
