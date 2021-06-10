package com.dandj.jtoday.service.member;

import com.dandj.jtoday.dto.member.MemberDto;
import com.dandj.jtoday.dto.member.MemberFileDto;
import com.dandj.jtoday.entity.market.Market;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.entity.member.MemberFile;
import com.dandj.jtoday.repository.market.MarketRepository;
import com.dandj.jtoday.repository.member.MemberFileRepository;
import com.dandj.jtoday.repository.member.MemberRepository;
import com.dandj.jtoday.spec.MemberSpec;
import com.dandj.jtoday.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@Log4j2
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final MemberFileRepository memberFileRepository;
    private final MarketRepository marketRepository;

    @Override
    public List<MemberDto> getMemberListByBizNo(String bizNo) {
        List<MemberDto> list = new ArrayList<>();
        memberRepository.findMembersByBizNo(bizNo).forEach(v->list.add(entityToDto(v)));

        return list;
    }

    @Override
    public List<MemberDto> getNewMemberList() {
        List<MemberDto> list = new ArrayList<>();
        memberRepository.findMembersByConfirmYnIsNull().forEach(member->{
            List<MemberFile> fileList = memberFileRepository.findMemberFilesByMember_UserId(member.getUserId());
            List<MemberFileDto> fileDto = new ArrayList<>();
            fileList.forEach(file -> fileDto.add(new MemberFileDto(file.getFilePath())));
            list.add(entityToDto(member, fileDto));
        });

        return list;
    }

    @Override
    public List<MemberDto> getMemberList(int sttPage, int perPage, String searchVal, String confirm) {
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

    @Override
    public MemberDto checkMember(String userId, String password) {
        Member member = memberRepository.findMemberByUserId(userId);
        String token = null;
        if(member != null && passwordEncoder.matches(password, member.getPassword())){
            try{
                JWTUtil jwtUtil = new JWTUtil();
                token = jwtUtil.generateToken(userId);
                MemberDto dto = entityToDto(member, token);
                Market market = marketRepository.findCompByUserId(userId);
                if(market != null){
                    dto.setImgUrl(market.getImgUrl());
                }
                return dto;
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return new MemberDto();
    }

    @Override
    public MemberDto getMember(String userId) {
        Member member = memberRepository.findMemberByUserId(userId);
        List<MemberFile> fileList = memberFileRepository.findMemberFilesByMember_UserId(userId);
        if(member != null){
            List<MemberFileDto> fileDto = new ArrayList<>();
            fileList.forEach(file -> fileDto.add(new MemberFileDto(file.getFilePath())));
            Market market = marketRepository.findCompByUserId(userId);
            return entityToDto(member, fileDto);
        }else{
            return new MemberDto();
        }
    }

    @Override
    public String register(MemberDto memberDto) {
        String enPw = passwordEncoder.encode(memberDto.getPassword());
        Map<String, Object> entityMap = dtoToEntity(memberDto, enPw);
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

    @Override
    public String update(MemberDto dto) {
        Member member = memberRepository.findMemberByUserId(dto.getUser_id());
        member.setTel(dto.getTel());
        member.setMobile(dto.getMobile());
        member.setEmail(dto.getEmail());
        memberRepository.save(member);

        return member.getUserId();
    }

    @Override
    public String updatePassword(String userid, String password) {
        String enPw = passwordEncoder.encode(password);
        Member member = memberRepository.findMemberByUserId(userid);
        member.setPassword(enPw);
        memberRepository.save(member);

        return member.getUserId();
    }

    @Override
    public String findId(String email, String mobile) {
        Specification<Member> spec = Specification.where(MemberSpec.email(email));
        spec = spec.and(Specification.where(MemberSpec.mobile(mobile)));
        Member member = memberRepository.findOne(spec);
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
            return member.getUserId() + "," + pw;
        }else{
            return "";
        }
    }

    @Override
    public String confirmMember(String userid, String confirm) {
        Member member = memberRepository.findMemberByUserId(userid);
        member.setConfirmYn(confirm);
        memberRepository.save(member);
        return "OK";
    }

    @Override
    public String setPushToken(String userid, String token, String typ) {
        Member member = memberRepository.findMemberByUserId(userid);
        memberRepository.save(member);
        return "OK";
    }
}
