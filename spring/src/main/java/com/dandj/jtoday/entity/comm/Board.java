package com.dandj.jtoday.entity.comm;

import lombok.*;

import javax.persistence.*;
import java.sql.Blob;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Board extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long pid;

    @Column(length = 2)
    private String boardTyp;    // 01:제품요청, 02:문의하기
    private String title;

    @Lob
    private Blob contents;

    private String writer;
    private int cmtCnt;

    @Column(length = 1)
    private String delYn;
    @Column(length = 1)
    private String lockYn;
}
