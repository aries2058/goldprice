package com.dandj.jtoday.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@Log4j2
@RequestMapping("/admin")
public class AdminController {
    @GetMapping({"/qna", "/member", "price", "market"})
    public void View(){ }
}
