package com.dandj.goldprice.controller;

import com.dandj.goldprice.dto.MemberDto;
import com.dandj.goldprice.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequiredArgsConstructor
@RestController
@Log4j2
@RequestMapping("api")
public class AuthController {
    private final MemberService service;

    @GetMapping(value="/auth/checkBizNo")
    public List<MemberDto> checkBizNo(String bizno){
        return service.getMemberListByBizNo(bizno);
    }

    @GetMapping(value="/auth/getMember")
    public MemberDto checkUserId(String userid){
        return service.getMember(userid);
    }

    @PostMapping(value = "/auth/register")
    public String register(MemberDto memberDto){
        String userId = service.register(memberDto);
        return userId;
    }

    @GetMapping(value="/auth/getNewMemberList")
    public List<MemberDto> getNewMemberList(){
        return service.getNewMemberList();
    }
    @GetMapping(value="/auth/getMemberList")
    public List<MemberDto> getMemberList(int sttPage, int perPage, String searchVal, String confirm){
        return service.getMemberList(sttPage, perPage, searchVal, confirm);
    }
}
