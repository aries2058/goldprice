package com.dandj.jtoday.entity.market;

import com.dandj.jtoday.entity.comm.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString(exclude = "market")
public class MarketImages extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1)
    private String delYn;

    @ManyToOne(fetch = FetchType.LAZY)
    private Market market;
}
