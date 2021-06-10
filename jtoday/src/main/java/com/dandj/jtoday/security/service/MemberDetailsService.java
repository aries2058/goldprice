package com.dandj.jtoday.security.service;

import com.dandj.jtoday.dto.security.AuthDto;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loadUserByUserName: " + username);
        Optional<Member> result = memberRepository.findByUserId(username);

        if(result == null){
            throw new UsernameNotFoundException("Check userId");
        }

        Member member = result.get();

        log.info("====================");
        log.info(member);

        AuthDto dto = new AuthDto(
                member.getUserId(),
                member.getPassword(),
                member.getRoleSet().stream()
                        .map(role-> new SimpleGrantedAuthority("ROLE_"+role.name())).collect(Collectors.toList())
        );

        //authMember.setUserId(member.getUserId());

        return dto;
    }
}
