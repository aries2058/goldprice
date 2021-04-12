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
    private String userId;
    private String password;
    private String userName;
    private String userTyp;
    private String compName;
    private String bizNo;
    private String tel;
    private String mobile;
    private String email;

    @ElementCollection(fetch=FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();

    public void addUserRole(MemberRole userRole){
        roleSet.add(userRole);
    }
}

