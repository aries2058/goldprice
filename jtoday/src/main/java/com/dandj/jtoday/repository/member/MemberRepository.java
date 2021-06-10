package com.dandj.jtoday.repository.member;

import com.dandj.jtoday.entity.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    @EntityGraph(attributePaths = {"roleSet"}, type = EntityGraph.EntityGraphType.LOAD)
    @Query("select m from Member m where m.userId =:userId")
    Optional<Member> findByUserId(String userId);

    List<Member> findMembersByBizNo(String bizNo);

    List<Member> findMembersByConfirmYnIsNull();

    Member findMemberByUserId(String userId);

    Page<Member> findAll(Specification<Member> spec, Pageable pageable);

    Member findOne(Specification<Member> spec);
}
