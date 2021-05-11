package com.dandj.goldprice.controller;

import com.dandj.goldprice.dto.MapInfoDto;
import com.dandj.goldprice.dto.PriceGoldDto;
import com.dandj.goldprice.entity.PriceGold;
import com.dandj.goldprice.service.CompService;
import com.dandj.goldprice.service.MapService;
import com.dandj.goldprice.service.PriceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("api")
@RequiredArgsConstructor
public class PriceController {
    private final PriceService priceService;

    @GetMapping(value="/price/getGold")
    public List<PriceGoldDto> getGold(String typ) {
        return priceService.getGold(typ);
    }

    @PostMapping(value = "/price/registerGold")
    public String registerGold(PriceGoldDto priceGoldDto){
        return priceService.registerGold(priceGoldDto);
    }
}
