package com.dandj.jtoday.controller;

import com.dandj.jtoday.dto.price.PriceDiaDto;
import com.dandj.jtoday.dto.price.PriceGoldDto;
import com.dandj.jtoday.dto.price.PricePearlDto;
import com.dandj.jtoday.dto.price.PriceSubuDto;
import com.dandj.jtoday.service.price.PriceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("price")
@RequiredArgsConstructor
public class PriceController {
    private final PriceService priceService;

    @GetMapping({"/gold", "/dia", "subu", "pearl"})
    public void View(){ }

    @GetMapping(value="/getGold")
    public ResponseEntity<List<PriceGoldDto>> getGold(String typ) {
        return new ResponseEntity<>(priceService.getGold(typ), HttpStatus.OK);
    }
    @PostMapping(value = "/registerGold")
    public ResponseEntity<String> registerGold(PriceGoldDto priceGoldDto){
        priceService.registerGold(priceGoldDto);
        return  new ResponseEntity<>("OK", HttpStatus.OK);
    }
    @GetMapping(value="/getDia")
    public ResponseEntity<List<PriceDiaDto> >getDia() {
        return  new ResponseEntity<>(priceService.getDia(), HttpStatus.OK);
    }
    @GetMapping(value="/getSubu")
    public ResponseEntity<List<PriceSubuDto>> getSubu() {
        return  new ResponseEntity<>(priceService.getSubu(), HttpStatus.OK);
    }
    @GetMapping(value="/getPearl")
    public ResponseEntity<List<PricePearlDto>> getPearl() {
        return  new ResponseEntity<>(priceService.getPearl(), HttpStatus.OK);
    }
}
