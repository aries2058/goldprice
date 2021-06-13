package com.dandj.jtoday.entity.member;

import com.dandj.jtoday.entity.comm.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member extends BaseEntity {
    @Id
    @Column(length = 20, nullable = false)
    private String userId;
    private String password;
    @Column(length = 20)
    private String userNm;
    @Column(length = 100)
    private String bizNm;
    @Column(length = 20)
    private String bizNo;
    @Column(length = 20)
    private String tel;
    @Column(length = 20)
    private String mobile;
    @Column(length = 100)
    private String email;
    @Column(length = 1)
    private String confirmYn;
    private Long marketId;
    private Long imageId;
    private Long uuid;

    @ElementCollection(fetch= FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();
    public void addMemberRole(MemberRole memberRole){
        roleSet.add(memberRole);
    }
}

