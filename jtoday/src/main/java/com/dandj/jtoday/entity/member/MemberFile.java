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
@Table(name = "member_files")
public class MemberFile extends BaseEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long memberFileId;

    @Column(columnDefinition = "TEXT")
    private String filePath;

    @Column(length = 50)
    private String ipAddr;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
