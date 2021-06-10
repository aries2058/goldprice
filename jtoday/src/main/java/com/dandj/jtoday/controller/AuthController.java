package com.dandj.jtoday.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Log4j2
@RequestMapping("/auth")
public class AuthController {
    @GetMapping({"/login", "/join"})
    public void View(){ }

    private final MemberService service;

    @GetMapping(value="/checkBizNo")
    public List<MemberDto> checkBizNo(String bizno){
        return service.getMemberListByBizNo(bizno);
    }

    @GetMapping(value="/getMember")
    public MemberDto checkUserId(String userid){
        return service.getMember(userid);
    }

    @PostMapping(value = "/register")
    public String register(MemberDto memberDto){
        String userId = service.register(memberDto);
        return userId;
    }
    @PostMapping(value = "/update")
    public String update(MemberDto memberDto){
        String userId = service.update(memberDto);
        return userId;
    }
    @PostMapping(value = "/updatePassword")
    public String updatePassword(String userid, String password){
        String userId = service.updatePassword(userid, password);
        return userId;
    }
    @PostMapping(value = "/login")
    public MemberDto login(String userid, String pw){
        return service.checkMember(userid, pw);
    }

    @PostMapping(value = "/setPushToken")
    public String setPushToken(String userid, String token, String typ){
        return service.setPushToken(userid, token, typ);
    }
    @GetMapping(value = "findId")
    public String findId(String email, String mobile){
        return service.findId(email, mobile);
    }
}
