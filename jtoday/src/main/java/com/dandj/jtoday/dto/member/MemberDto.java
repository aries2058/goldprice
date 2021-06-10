package com.dandj.jtoday.dto.member;

import com.dandj.jtoday.dto.market.MarketDto;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.entity.member.MemberFile;
import com.dandj.jtoday.entity.member.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;
import java.util.stream.Collectors;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDto {
    private PasswordEncoder passwordEncoder;

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
    private String imgUrl;

    @Builder.Default
    private List<MemberFileDto> fileDtoList = new ArrayList<>();
    @Builder.Default
    private MarketDto marketDto = new MarketDto();
    @Builder.Default
    private Collection<String> roleSet = new HashSet<>();



    private MemberDto entityToDto(Member entity){
        MemberDto dto = MemberDto.builder()
                .user_id(entity.getUserId())
                .user_nm(entity.getUserNm())
                .biz_nm(entity.getBizNm())
                .biz_no(entity.getBizNo())
                .mobile(entity.getMobile())
                .tel(entity.getTel())
                .email(entity.getEmail())
                .confirm_yn(entity.getConfirmYn())
                .roleSet(entity.getRoleSet().stream()
                        .map(role->role.name()).collect(Collectors.toList())).build();
        return dto;
    }
    private MemberDto entityToDto(Member entity, List<MemberFileDto> files){
        MemberDto dto = MemberDto.builder()
                .user_id(entity.getUserId())
                .user_nm(entity.getUserNm())
                .biz_nm(entity.getBizNm())
                .biz_no(entity.getBizNo())
                .mobile(entity.getMobile())
                .tel(entity.getTel())
                .email(entity.getEmail())
                .confirm_yn(entity.getConfirmYn())
                .fileDtoList(files)
                .roleSet(entity.getRoleSet().stream()
                        .map(role->role.name()).collect(Collectors.toList())).build();
        return dto;
    }
    private MemberDto entityToDto(Member entity, String token){
        MemberDto dto = MemberDto.builder()
                .user_id(entity.getUserId())
                .user_nm(entity.getUserNm())
                .biz_nm(entity.getBizNm())
                .biz_no(entity.getBizNo())
                .mobile(entity.getMobile())
                .tel(entity.getTel())
                .email(entity.getEmail())
                .token(token)
                .confirm_yn(entity.getConfirmYn())
                .roleSet(entity.getRoleSet().stream()
                        .map(role->role.name()).collect(Collectors.toList())).build();
        return dto;
    }


    private Map<String, Object> dtoToEntity(MemberDto memberDto){
        String enPw = passwordEncoder.encode(memberDto.getPassword());

        Map<String, Object> entityMap = new HashMap<>();
        Member member = Member.builder()
                .userId(memberDto.getUser_id())
                .password(enPw)
                .userNm(memberDto.getUser_nm())
                .bizNo(memberDto.getBiz_no())
                .bizNm(memberDto.getBiz_nm())
                .tel(memberDto.getTel())
                .email(memberDto.getEmail())
                .mobile(memberDto.getMobile()).build();
        String[] arr = memberDto.getUser_typ().split(",");
        for (String typ:arr ) {
            member.addMemberRole(MemberRole.valueOf(typ));
        }
        entityMap.put("member", member);
        List<MemberFileDto> memberFileDtoList = memberDto.getFileDtoList();

        if(memberFileDtoList != null && memberFileDtoList.size() > 0){
            List<MemberFile> memberFileList = memberFileDtoList.stream().map(memberFileDto -> {
                MemberFile memberFile = MemberFile.builder()
                        .filePath(memberFileDto.getFilePath())
                        .ipAddr(memberDto.getIpaddr())
                        .member(member).build();
                return memberFile;
            }).collect(Collectors.toList());

            entityMap.put("fileList", memberFileList);
        }
        return entityMap;
    }
}
