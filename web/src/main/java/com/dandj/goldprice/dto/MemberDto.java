package com.dandj.goldprice.dto;

import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDto {
    private String user_id;
    private String confirm_yn;
    private String password;
    private String biz_no;
    private String biz_nm;
    private String mobile;
    private String tel;
    private String user_nm;
    private String ipaddr;
    private String user_typ;
    private String token;
    private String email;
    private String push_yn;
    private String imgUrl;

    @Builder.Default
    private List<MemberFileDto> fileDtoList = new ArrayList<>();
    @Builder.Default
    private CompDto compDto = new CompDto();
    @Builder.Default
    private Collection<String> roleSet = new HashSet<>();
}
