package com.dandj.goldprice.repository;

import com.dandj.goldprice.entity.PushToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PushTokenRepository  extends JpaRepository<PushToken, Long> {
    PushToken findPushTokenByUuid(Long uuid);
}
