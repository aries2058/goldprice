package com.dandj.goldprice.security;

import com.dandj.goldprice.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class UsersTests {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MemberRepository repository;

    @Test
    public void updatePassword(){
//        Member user = Member.builder().password(passwordEncoder.encode("1111")).build();
//        user.addUserRole(MemberRole.ADMIN);
//        repository.save(user);
        System.out.println(passwordEncoder.encode("1111"));
    }
}
