package com.dandj.jtoday.service.member;

import com.dandj.jtoday.dto.member.MemberDto;
import com.dandj.jtoday.entity.comm.PushToken;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.entity.member.MemberImages;
import com.dandj.jtoday.repository.comm.PushTokenRepository;
import com.dandj.jtoday.repository.member.MemberImagesRepository;
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

import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final MemberImagesRepository memberImagesRepository;
    private final PushTokenRepository pushTokenRepository;

    @Override
    public List<MemberDto> getMemberListByBizNo(String bizNo) {
        List<MemberDto> ret = new ArrayList<>();
        Optional<List<Member>> data = memberRepository.findMembersByBizNo(bizNo);

        data.ifPresent(x->{
            x.forEach(member -> {
                ret.add(entityToDto(member));
            });
        });

        return ret;
    }

    @Override
    public List<MemberDto> getNewMemberList() {
        List<MemberDto> ret = new ArrayList<>();
        Optional<List<Member>> data = memberRepository.findMembersByConfirmYnIsNull();

        data.ifPresent(x->{
            x.forEach(member -> {
                ret.add(entityToDto(member));
            });
        });

        return  ret;
    }

    @Override
    public List<MemberDto> getMemberList(int sttPage, int perPage, String searchVal, String confirm) {
        List<MemberDto> ret = new ArrayList<>();

        Specification<Member> spec = Specification.where(MemberSpec.bizNoLike(searchVal));
        spec = spec.or(Specification.where(MemberSpec.bizNmLike(searchVal)));
        spec = spec.or(Specification.where(MemberSpec.telLike(searchVal)));
        spec = spec.or(Specification.where(MemberSpec.userIdLike(searchVal)));
        spec = spec.or(Specification.where(MemberSpec.userNmLike(searchVal)));

        if(!confirm.isEmpty()){
            spec = spec.and(Specification.where(MemberSpec.confirmedMember(confirm)));
        }

        Pageable pageable = PageRequest.of(sttPage, perPage);
        Page<Member> data = memberRepository.findAll(spec, pageable);

        List<Long> imageIds = new ArrayList<>();
        data.forEach(x -> {
            memberImagesRepository.findMemberImagesByMember_UserId(x.getUserId()).forEach(y->{
                imageIds.add(y.getImageId());
            });
            ret.add(entityToDto(x, imageIds));
        });

        return ret;
    }

    @Override
    public MemberDto checkMember(String userId, String password) {
        // 로그인할 때 정보
        MemberDto ret = new MemberDto();
        Optional<Member> data = memberRepository.findByUserId(userId);

        if(data.isPresent()){
            if(passwordEncoder.matches(password, data.get().getPassword())){
                try{
                    JWTUtil jwtUtil = new JWTUtil();
                    String token = jwtUtil.generateToken(userId);
                    ret = entityToDto(data.get(), token);
                    return ret;
                }catch (Exception e){
                    e.printStackTrace();
                }
            }else{
                ret.setLogin_msg("비밀번호를 확인해주세요.");
            }
        }

        ret.setLogin_msg("존재하지 않는 계정입니다.");
        return ret;
    }

    @Override
    public MemberDto getMember(String userId) {
        // 마이페이지 조회 등
        MemberDto ret = new MemberDto();
        Optional<Member> data = memberRepository.findByUserId(userId);

        if(data.isPresent()){
            ret = entityToDto(data.get());
        }
        return  ret;
    }

    @Override
    public String register(MemberDto memberDto) {
        String enPw = passwordEncoder.encode(memberDto.getPassword());
        Member member = dtoToEntity(memberDto, enPw);
        memberRepository.save(member);
        memberDto.getImages_ids().forEach(x->{
            MemberImages images = MemberImages.builder()
                    .imageId(x)
                    .member(member).build();
            memberImagesRepository.save(images);
        });
        return member.getUserId();
    }

    @Override
    public void update(MemberDto dto) {
        Optional<Member> member = memberRepository.findByUserId(dto.getUser_id());
        member.ifPresent(x->{
            x.setTel(dto.getTel());
            x.setMobile(dto.getMobile());
            x.setEmail(dto.getEmail());
            memberRepository.save(x);
        });
    }

    @Override
    public void updateMarketId(String bizNo, Long marketId, Long imageId) {
        Optional<List<Member>> data = memberRepository.findMembersByBizNo(bizNo);
        data.ifPresent(members->{
            members.forEach(x->{
                x.setMarketId(marketId);
                x.setImageId(imageId);
                memberRepository.save(x);
            });
        });
    }

    @Override
    public void updatePassword(String userid, String password) {
        String enPw = passwordEncoder.encode(password);
        Optional<Member> member = memberRepository.findByUserId(userid);
        member.ifPresent(x ->{
            x.setPassword(enPw);
            memberRepository.save(x);
        });
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
    public void confirmMember(String userid, String confirm) {
        Optional<Member> member = memberRepository.findByUserId(userid);
        member.ifPresent(x->{
            x.setConfirmYn(confirm);
            memberRepository.save(x);
        });
    }
}
