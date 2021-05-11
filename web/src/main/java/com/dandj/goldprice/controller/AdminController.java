package com.dandj.goldprice.controller;

import com.dandj.goldprice.dto.MemberDto;
import com.dandj.goldprice.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {
    private final MemberService service;
    @GetMapping(value="/update_gold")
    public HttpStatus updateGold(){
        return HttpStatus.OK;
    }

    @GetMapping(value="/auth/getNewMemberList")
    public List<MemberDto> getNewMemberList(){
        return service.getNewMemberList();
    }
    @GetMapping(value="/auth/getMemberList")
    public List<MemberDto> getMemberList(int sttPage, int perPage, String searchVal, String confirm){
        return service.getMemberList(sttPage, perPage, searchVal, confirm);
    }
    @GetMapping(value = "/auth/confirmMember")
    public String confirmMember(String userid, String confirm){
        return service.confrimMember(userid, confirm);
    }
}
