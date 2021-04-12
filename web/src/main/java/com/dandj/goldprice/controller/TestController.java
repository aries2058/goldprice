package com.dandj.goldprice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping("test")
@RequiredArgsConstructor
public class TestController {
    @GetMapping(value="/001")
    public ResponseEntity<String> apiFilterTest(){
        return new ResponseEntity<>("Good", HttpStatus.OK);
    }
}
