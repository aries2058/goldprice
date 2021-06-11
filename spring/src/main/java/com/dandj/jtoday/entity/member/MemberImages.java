package com.dandj.jtoday.entity.member;


import com.dandj.jtoday.entity.comm.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString(exclude = "member")
public class MemberImages extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long imageId;

    @Column(length = 1)
    private String delYn;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
