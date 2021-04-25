package com.dandj.goldprice.entity;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member extends BaseEntity {
    @Id
    @Column(length = 20, nullable = false)
    private String userId;
    private String password;
    private String userNm;
    private String bizNm;
    private String bizNo;
    private String tel;
    private String mobile;
    private String confirmYn;

    @ElementCollection(fetch=FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();

    public void addMemberRole(MemberRole memberRole){
        roleSet.add(memberRole);
    }
}

