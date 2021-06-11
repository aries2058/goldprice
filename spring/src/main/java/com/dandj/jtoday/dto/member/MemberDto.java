package com.dandj.jtoday.dto.member;

import com.dandj.jtoday.dto.market.MarketDto;
import com.dandj.jtoday.entity.comm.Images;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.entity.member.MemberFile;
import com.dandj.jtoday.entity.member.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Blob;
import java.util.*;
import java.util.stream.Collectors;

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
    private String push_token;
    private String push_typ;
    private Blob photo;
    private String login_msg;
    private List<Long> images;

    @Builder.Default
    private MarketDto marketDto = new MarketDto();
    @Builder.Default
    private Collection<String> roleSet = new HashSet<>();
}
