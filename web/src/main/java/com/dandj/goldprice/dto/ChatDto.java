package com.dandj.goldprice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChatDto {
    Long id;
    String userId;
    String content;
    String delYn;
    String sendYn;
    String newYn;
    LocalDateTime regDate;
}
