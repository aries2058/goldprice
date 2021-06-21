package com.dandj.jtoday.controller;

import com.dandj.jtoday.dto.market.MarketDto;
import com.dandj.jtoday.dto.market.MarketMapDto;
import com.dandj.jtoday.service.market.MarketService;
import com.dandj.jtoday.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.SQLException;
import java.util.List;

@Controller
@Log4j2
@RequestMapping("/market")
@RequiredArgsConstructor
public class MarketController {
    private final MarketService marketService;
    private final MemberService memberService;

    @GetMapping({"/listByItem", "/write", "/detail", "map", "list"})
    public void View(){
    }

    @PostMapping("/register")
    public ResponseEntity<Long> register(MarketDto dto) throws SQLException {
        return new ResponseEntity<>(marketService.register(dto), HttpStatus.OK);
    }

    @GetMapping("/getMarket")
    public ResponseEntity<MarketDto> getMarket(Long id){
        return new ResponseEntity<>(marketService.getMarket(id), HttpStatus.OK);
    }

    @GetMapping("/updateMarketId")
    public ResponseEntity<String> updateMarketId(String bizNo, Long marketId) {
        memberService.updateMarketId(bizNo, marketId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/getMap")
    public ResponseEntity<List<MarketMapDto>> getMap(){
        return new ResponseEntity<>(marketService.getMap(), HttpStatus.OK);
    }

    @GetMapping("/getMarketList")
    public ResponseEntity<List<MarketDto>> getMarketList(Long mapid){
        return new ResponseEntity<>(marketService.getMarketList(mapid), HttpStatus.OK);
    }
}