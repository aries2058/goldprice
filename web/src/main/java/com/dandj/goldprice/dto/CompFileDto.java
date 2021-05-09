package com.dandj.goldprice.dto;

import com.dandj.goldprice.entity.CompFile;
import com.dandj.goldprice.entity.MemberFile;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CompFileDto {
    private String filePath;
    private String ipAddr;

    public CompFile toEntity(){
        CompFile build = CompFile.builder()
                .filePath(filePath)
                .ipAddr(ipAddr)
                .build();
        return build;
    }

    @Builder
    public CompFileDto(String filePath) {
        this.filePath = filePath;
    }
}
