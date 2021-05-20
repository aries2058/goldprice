package com.dandj.goldprice.repository;

import com.dandj.goldprice.entity.Chat;
import com.dandj.goldprice.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Page<Chat> findChatByUserId(String userId, Pageable pageable);

}
