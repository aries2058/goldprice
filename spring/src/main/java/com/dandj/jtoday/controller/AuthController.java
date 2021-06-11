package com.dandj.jtoday.controller;

import com.dandj.jtoday.dto.member.MemberDto;
import com.dandj.jtoday.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
@Log4j2
@RequestMapping("/auth")
public class AuthController {
    @GetMapping({"/login", "/join", "/findId"})
    public void View(){ }

    private final MemberService service;

    @GetMapping(value="/checkBizNo")
    public ResponseEntity<List<MemberDto>> checkBizNo(String bizno){
        return new ResponseEntity<>(service.getMemberListByBizNo(bizno), HttpStatus.OK);
    }

    @GetMapping(value="/getMember")
    public ResponseEntity<MemberDto> getMember(String userid){
        return new ResponseEntity<>(service.getMember(userid), HttpStatus.OK);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> register(MemberDto memberDto){
        String userId = service.register(memberDto);
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }
    @PostMapping(value = "/update")
    public ResponseEntity<String> update(MemberDto memberDto){
        String userId = service.update(memberDto);
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }
    @PostMapping(value = "/updatePassword")
    public ResponseEntity<String> updatePassword(String userid, String password){
        service.updatePassword(userid, password);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
    @PostMapping(value = "/login")
    public ResponseEntity<MemberDto> login(String userid, String pw){
        return new ResponseEntity<>(service.checkMember(userid, pw), HttpStatus.OK);
    }

    @PostMapping(value = "/setPushToken")
    public ResponseEntity<String> setPushToken(String userid, String token, String typ){
        return new ResponseEntity<>(service.setPushToken(userid, token, typ), HttpStatus.OK);
    }
    @PostMapping(value = "findIdPw")
    public ResponseEntity<String> findIdPw(String email, String mobile){
        return new ResponseEntity<>(service.findId(email, mobile), HttpStatus.OK) ;
    }
}
