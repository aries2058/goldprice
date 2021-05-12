package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.MemberDto;
import com.dandj.goldprice.dto.MemberFileDto;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.Member;
import com.dandj.goldprice.entity.MemberFile;
import com.dandj.goldprice.entity.MemberRole;
import com.dandj.goldprice.repository.CompRepository;
import com.dandj.goldprice.repository.MemberFileRepository;
import com.dandj.goldprice.repository.MemberRepository;
import com.dandj.goldprice.spec.MemberSpec;
import com.dandj.goldprice.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final MemberFileRepository memberFileRepository;
    private final CompRepository compRepository;

    public List<MemberDto> getMemberListByBizNo(String bizNo){
        List<MemberDto> list = new ArrayList<>();
        memberRepository.findMembersByBizNo(bizNo).forEach(v->list.add(entityToDto(v)));

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

    public MemberDto checkMember(String userId, String password){
        Member member = memberRepository.findMemberByUserId(userId);
        String token = null;
        if(member != null && passwordEncoder.matches(password, member.getPassword())){
            try{
                JWTUtil jwtUtil = new JWTUtil();
                token = jwtUtil.generateToken(userId);
                MemberDto dto = entityToDto(member, token);
                Comp comp = compRepository.findCompByUserId(userId);
                if(comp != null){
                    dto.setImgUrl(comp.getImgUrl());
                }
                return dto;
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return new MemberDto();
    }

    public MemberDto getMember(String userId){
        Member member = memberRepository.findMemberByUserId(userId);
        List<MemberFile> fileList = memberFileRepository.findMemberFilesByMember_UserId(userId);
        if(member != null){
            List<MemberFileDto> fileDto = new ArrayList<>();
            fileList.forEach(file -> fileDto.add(new MemberFileDto(file.getFilePath())));
            Comp comp = compRepository.findCompByUserId(userId);
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
        if(memberFileList != null){
            memberFileList.forEach(file ->{
                memberFileRepository.save(file);
            });
        }
        return member.getUserId();
    }
    public String update(MemberDto dto){
        Member member = memberRepository.findMemberByUserId(dto.getUser_id());
        member.setTel(dto.getTel());
        member.setMobile(dto.getMobile());
        member.setEmail(dto.getEmail());
        member.setPushYn(dto.getPush_yn());
        memberRepository.save(member);

        return member.getUserId();
    }
    public String updatePassword(String userid, String password){
        String enPw = passwordEncoder.encode(password);
        Member member = memberRepository.findMemberByUserId(userid);
        member.setPassword(enPw);
        memberRepository.save(member);

        return member.getUserId();
    }

    public String findId(String email, String mobile){
        Member member = memberRepository.findMemberByEmailAndMobile(email, mobile);
        if(member != null){
            Random random = new Random();
            String pw = random.ints(48, 123)
                    .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                    .limit(6)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();

            String enPw = passwordEncoder.encode(pw);
            member.setPassword(enPw);
            memberRepository.save(member);

            return member.getUserId() +","+pw;
        }else{
            return "정보가 일치하는 계정이 없습니다.";
        }
    }


    public String confrimMember(String userid, String confirm){
        Member member = memberRepository.findMemberByUserId(userid);
        member.setConfirmYn(confirm);
        memberRepository.save(member);
        return "OK";
    }

    public String setPushToken(String userid, String token, String typ){
        Member member = memberRepository.findMemberByUserId(userid);
        member.setPushToken(token);
        member.setPushType(typ);
        memberRepository.save(member);
        return "OK";
    }

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
                .push_yn(entity.getPushYn())
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
                .push_yn(entity.getPushYn())
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
                .push_yn(entity.getPushYn())
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
                .mobile(memberDto.getMobile())
                .pushYn("Y").build();
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
