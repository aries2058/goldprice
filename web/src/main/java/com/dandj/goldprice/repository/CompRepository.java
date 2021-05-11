package com.dandj.goldprice.repository;

import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompRepository extends JpaRepository<Comp, Long> {
    Comp findCompByUserId(String userId);
}
