package com.dandj.goldprice.repository;

import com.dandj.goldprice.entity.Member;
import com.dandj.goldprice.entity.MemberFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberFileRepository extends JpaRepository<MemberFile, Long> {
    List<MemberFile> findMemberFilesByMember_UserId(String userId);
}
