package com.dandj.jtoday.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Log4j2
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MypageController {
    @GetMapping({"/list", "/changeInfo", "changePassword"})
    public void View(){
    }

}
