package com.dandj.jtoday.dto.comm;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private String biz_nm;
    private String user_nm;
    private String lock_yn;
    private LocalDateTime regdt;
    private LocalDateTime moddt;
    private int cmt_cnt;

    @Builder.Default
    private List<Long> image_ids = new ArrayList<>();
}
