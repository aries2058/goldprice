package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.MemberDto;
import com.dandj.goldprice.dto.MemberFileDto;
import com.dandj.goldprice.entity.Member;
import com.dandj.goldprice.entity.MemberFile;
import com.dandj.goldprice.entity.MemberRole;
import com.dandj.goldprice.repository.MemberFileRepository;
import com.dandj.goldprice.repository.MemberRepository;
import com.dandj.goldprice.spec.MemberSpec;
import com.dandj.goldprice.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final MemberFileRepository memberFileRepository;

    public List<MemberDto> getMemberListByBizNo(String bizNo){
        List<MemberDto> list = new ArrayList<>();
        memberRepository.findMembersByBizNo(bizNo).forEach(v->list.add(entityToDto(v, null)));

        return list;
    }
    public List<MemberDto> getNewMemberList(){
        List<MemberDto> list = new ArrayList<>();
        memberRepository.findMembersByConfirmYnIsNull().forEach(member->{
            List<MemberFile> fileList = memberFileRepository.findMemberFilesByMember_UserId(member.getUserId());
            List<MemberFileDto> fileDto = new ArrayList<>();
            fileList.forEach(file -> fileDto.add(new MemberFileDto(file.getFilePath())));
            list.add(entityToDto(member, fileDto));
        });

        return list;
    }
    public List<MemberDto> getMemberList(int sttPage, int perPage, String searchVal, String confirm){
        List<MemberDto> list = new ArrayList<>();

        Specification<Member> spec = Specification.where(MemberSpec.bizNoLike(searchVal));
        spec = spec.or(Specification.where(MemberSpec.bizNmLike(searchVal)));
        spec = spec.or(Specification.where(MemberSpec.telLike(searchVal)));
        spec = spec.or(Specification.where(MemberSpec.userIdLike(searchVal)));

        if(confirm.equals("Y")){
            spec = spec.and(Specification.where(MemberSpec.confirmedMember()));
        }

        Pageable pageable = PageRequest.of(sttPage, perPage);
        Page<Member> result = memberRepository.findAll(spec, pageable);

        result.forEach(member -> {
            List<MemberFile> fileList = memberFileRepository.findMemberFilesByMember_UserId(member.getUserId());
            List<MemberFileDto> fileDto = new ArrayList<>();
            fileList.forEach(file -> fileDto.add(new MemberFileDto(file.getFilePath())));
            list.add(entityToDto(member, fileDto));
        });

        return list;
    }

    public String checkMember(String userId, String password){
        Member member = memberRepository.findMemberByUserId(userId);
        String token = null;
        log.info(member.getConfirmYn().equals("Y"));
        if(member != null && passwordEncoder.matches(password, member.getPassword()) && member.getConfirmYn().equals("Y")){
            try{
                JWTUtil jwtUtil = new JWTUtil();
                token = jwtUtil.generateToken(userId);
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return token;
    }

    public MemberDto getMember(String userId){
        Member member = memberRepository.findMemberByUserId(userId);
        List<MemberFile> fileList = memberFileRepository.findMemberFilesByMember_UserId(userId);
        if(member != null){
            List<MemberFileDto> fileDto = new ArrayList<>();
            fileList.forEach(file -> fileDto.add(new MemberFileDto(file.getFilePath())));
            return entityToDto(member, fileDto);
        }else{
            return new MemberDto();
        }
    }

    public String register(MemberDto memberDto){
        Map<String, Object> entityMap = dtoToEntity(memberDto);
        Member member = (Member) entityMap.get("member");
        List<MemberFile> memberFileList = (List<MemberFile>) entityMap.get("fileList");

        memberRepository.save(member);
        memberFileList.forEach(file ->{
            memberFileRepository.save(file);
        });

        return member.getUserId();
    }

    private MemberDto entityToDto(Member entity, List<MemberFileDto> files){
        MemberDto dto = MemberDto.builder()
                .user_id(entity.getUserId())
                .user_nm(entity.getUserNm())
                .biz_nm(entity.getBizNm())
                .biz_no(entity.getBizNo())
                .mobile(entity.getMobile())
                .tel(entity.getTel())
                .confirm_yn(entity.getConfirmYn())
                .fileDtoList(files)
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
                .mobile(memberDto.getMobile()).build();
        member.addMemberRole(MemberRole.valueOf(memberDto.getUser_typ()));
        entityMap.put("member", member);
        List<MemberFileDto> memberFileDtoList = memberDto.getFileDtoList();

        if(memberFileDtoList != null && memberFileDtoList.size() > 0){
            List<MemberFile> memberFileList = memberFileDtoList.stream().map(memberFileDto -> {
               MemberFile memberFile = MemberFile.builder()
                        .filePath("/display/" + memberFileDto.getFilePath())
                       .ipAddr(memberDto.getIpaddr())
                       .member(member).build();
               return memberFile;
            }).collect(Collectors.toList());

            entityMap.put("fileList", memberFileList);
        }
        return entityMap;
    }
}
