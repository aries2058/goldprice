package com.dandj.jtoday.dto.member;

import com.dandj.jtoday.dto.market.MarketDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDto {
    private String user_id;
    private String password;
    private String user_nm;
    private String biz_nm;
    private String biz_no;
    private String tel;
    private String mobile;
    private String email;
    private String confirm_yn;
    private Long market_id;
    private Long image_id;
    private String ipaddr;
    private String user_typ;
    private String token;
    private String push_yn;
    private String push_token;
    private String push_typ;
    private Blob photo;
    private String login_msg;
    private List<Long> images_ids;

    @Builder.Default
    private Collection<String> roleSet = new HashSet<>();
}
