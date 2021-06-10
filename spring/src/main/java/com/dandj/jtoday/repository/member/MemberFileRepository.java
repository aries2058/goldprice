package com.dandj.jtoday.repository.member;

import com.dandj.jtoday.entity.member.MemberFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberFileRepository extends JpaRepository<MemberFile, Long> {
    List<MemberFile> findMemberFilesByMember_UserId(String userId);
}
