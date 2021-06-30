package com.dandj.jtoday.repository.comm;

import com.dandj.jtoday.entity.comm.PushToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PushTokenRepository  extends JpaRepository<PushToken, Long> {
    Optional<PushToken> findPushTokenByUuid(Long uuid);
    Optional<List<PushToken>> findPushTokensByPushYn(String pushYn);
}
