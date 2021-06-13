package com.dandj.jtoday.spec;

import com.dandj.jtoday.entity.comm.Board;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class BoardSpec {
    public static Specification<Board> contentsLike(final String searchVal){
        return new Specification<Board>() {
            @Override
            public Predicate toPredicate(Root<Board> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("contents"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Board> titleLike(final String searchVal){
        return new Specification<Board>() {
            @Override
            public Predicate toPredicate(Root<Board> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("title"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Board> writer(final String searchVal){
        return new Specification<Board>() {
            @Override
            public Predicate toPredicate(Root<Board> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("writer"), searchVal);
            }
        };
    }
    public static Specification<Board> typ(final String searchVal){
        return new Specification<Board>() {
            @Override
            public Predicate toPredicate(Root<Board> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("boardTyp"), searchVal);
            }
        };
    }
}
