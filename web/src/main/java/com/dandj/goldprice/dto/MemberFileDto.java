package com.dandj.goldprice.dto;

import com.dandj.goldprice.entity.MemberFile;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberFileDto {
    private String filePath;
    private String ipAddr;

    public MemberFile toEntity(){
        MemberFile build = MemberFile.builder()
                .filePath(filePath)
                .ipAddr(ipAddr)
                .build();
        return build;
    }

    @Builder
    public MemberFileDto(String filePath) {
        this.filePath = filePath;
    }
}
