package com.dandj.jtoday.repository.member;

import com.dandj.jtoday.entity.member.MemberImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberImagesRepository extends JpaRepository<MemberImages, Long> {
    List<MemberImages> findMemberImagesByMember_UserId(String userId);
}
