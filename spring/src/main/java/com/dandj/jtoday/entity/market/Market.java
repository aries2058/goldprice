package com.dandj.jtoday.entity.market;

import com.dandj.jtoday.entity.comm.BaseEntity;
import com.dandj.jtoday.entity.comm.Images;
import com.dandj.jtoday.entity.member.MemberRole;
import lombok.*;

import javax.persistence.*;
import javax.swing.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Market extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String marketNm;
    @Column(length = 20)
    private String bizNo;

    @Column(length = 20)
    private String tel;
    @Column(length = 100)
    private String email;
    @Column(length = 2000)
    private String contents;

    @Column(length = 500, nullable = false)
    private String addr;
    @Column(length = 500, nullable = false)
    private String addrDetail;

    private Long imageId;   // 대표이미지
    private Long mapId;     // 빌딩

    private String marketTyp;   // 매장구분
    private String itemTyp;      // 취급상품구분

    private String linkKakao;
    private String linkGoldpen;
    private String linkSns;
    private String linkHomepage;

    private String hotYn;


    @Column(length = 20)
    private String writer;
}
