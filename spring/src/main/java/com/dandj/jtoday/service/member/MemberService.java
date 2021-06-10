package com.dandj.jtoday.service.member;

import com.dandj.jtoday.dto.member.MemberDto;
import com.dandj.jtoday.dto.member.MemberFileDto;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.entity.member.MemberFile;
import com.dandj.jtoday.entity.member.MemberRole;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public interface MemberService {
    List<MemberDto> getMemberListByBizNo(String bizNo);
    List<MemberDto> getNewMemberList();
    List<MemberDto> getMemberList(int sttPage, int perPage, String searchVal, String confirm);
    MemberDto checkMember(String userId, String password);
    MemberDto getMember(String userId);
    String register(MemberDto memberDto);
    String update(MemberDto dto);
    String updatePassword(String userid, String password);
    String findId(String email, String mobile);
    String confirmMember(String userid, String confirm);
    String setPushToken(String userid, String token, String typ);


    default Map<String, Object> dtoToEntity(MemberDto memberDto , String enPw){
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

    default MemberDto entityToDto(Member entity){
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
    default MemberDto entityToDto(Member entity, List<MemberFileDto> files){
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
    default MemberDto entityToDto(Member entity, String token){
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
}

