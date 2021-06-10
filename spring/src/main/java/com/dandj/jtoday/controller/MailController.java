package com.dandj.jtoday.controller;

import com.dandj.jtoday.dto.apis.MailDto;
import com.dandj.jtoday.service.api.MailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@AllArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping("/mail")
    public ResponseEntity<String> execMail(MailDto mailDto) {
        mailService.mailSend(mailDto);
        return new ResponseEntity("", HttpStatus.OK);
    }
}