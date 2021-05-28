package com.dandj.goldprice.controller;

import com.dandj.goldprice.service.MemberService;
import com.dandj.goldprice.service.PushService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping("api")
@RequiredArgsConstructor

public class PushController {
    private final PushService service;

    @PostMapping(value="/push/register")
    public Long register(String userid, String token, String typ){
        return service.register(token, typ, userid);
    }

    @GetMapping(value="/push/send")
    public Long send(String message){

        return service.send(message);
    }
}
