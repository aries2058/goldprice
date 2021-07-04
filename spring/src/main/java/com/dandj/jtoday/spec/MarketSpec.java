package com.dandj.jtoday.spec;

import com.dandj.jtoday.entity.market.Market;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class MarketSpec {
    public static Specification<Market> marketNmLike(final String searchVal){
        return new Specification<Market>() {
            @Override
            public Predicate toPredicate(Root<Market> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("marketNm"), "%"+searchVal+"%");
            }
        };
    }
    public static Specification<Market> contentsLike(final String searchVal){
        return new Specification<Market>() {
            @Override
            public Predicate toPredicate(Root<Market> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("contents"), "%"+searchVal+"%");
            }
        };
    }
}
