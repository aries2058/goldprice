package com.dandj.jtoday.dto.comm;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardDto {
    private Long id;
    private Long pid;
    private String board_typ;
    private String title;
    private String contents;
    private String writer;
    private String lock_yn;
    private LocalDateTime regdt;
    private LocalDateTime moddt;
    private int cmt_cnt;
}
