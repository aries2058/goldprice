package com.dandj.jtoday.spec;


import com.dandj.jtoday.entity.member.Member;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class MemberSpec {
    public static Specification<Member> bizNoLike(final String searchVal){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("bizNo"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Member> bizNmLike(final String searchVal){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("bizNm"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Member> telLike(final String searchVal){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("tel"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Member> userNmLike(final String searchVal){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("userNm"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Member> userIdLike(final String searchVal){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("userId"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Member> confirmedMember(final String searchVal){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("confirmYn"), searchVal);
            }
        };
    }

    public static Specification<Member> email(String email){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("email"), email);
            }
        };
    }
    public static Specification<Member> mobile(String mobile){
        return new Specification<Member>() {
            @Override
            public Predicate toPredicate(Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("mobile"), mobile);
            }
        };
    }
}
