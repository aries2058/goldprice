package com.dandj.goldprice.service;

import com.dandj.goldprice.GoldpriceApplication;
import com.dandj.goldprice.dto.*;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.PriceDia;
import com.dandj.goldprice.entity.PriceGold;
import com.dandj.goldprice.entity.PriceSubu;
import com.dandj.goldprice.repository.CompRepository;
import com.dandj.goldprice.repository.PriceDiaRepository;
import com.dandj.goldprice.repository.PriceGoldRepository;
import com.dandj.goldprice.repository.PriceSubuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PriceService {
    private final PriceGoldRepository priceGoldRepository;
    private final PriceDiaRepository priceDiaRepository;
    private final PriceSubuRepository priceSubuRepository;

    public List<PriceGoldDto> getGold(String typ){
        List<PriceGoldDto> list = new ArrayList<>();
        if(typ != null && !typ.isEmpty()){
            list.add(goldEntityToDto(priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc(typ).get(0)));
        }else{
            List<PriceGold> priceGold = priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc("G");
            if(priceGold.size() > 0){
                list.add(goldEntityToDto(priceGold.get(0)));
            }
            priceGold = priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc("S");
            if(priceGold.size() > 0){
                list.add(goldEntityToDto(priceGold.get(0)));
            }
            priceGold = priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc("W");
            if(priceGold.size() > 0){
                list.add(goldEntityToDto(priceGold.get(0)));
            }
        }

        return list;
    }

    private PriceGoldDto goldEntityToDto(PriceGold entity){
        PriceGoldDto dto = PriceGoldDto.builder()
                .typ(entity.getTyp())
                .vat(entity.getVat())
                .sell(entity.getSell())
                .buy(entity.getBuy())
                .regdate(entity.getRegDate()).build();
        return dto;
    }

    public List<PriceDiaDto> getDia(){
        List<PriceDiaDto> list = new ArrayList<>();
        priceDiaRepository.findAll().forEach(x-> list.add(diaEntityToDto(x)));
        return list;
    }

    private PriceDiaDto diaEntityToDto(PriceDia entity){
        PriceDiaDto dto = PriceDiaDto.builder()
                .app(entity.getApp())
                .color(entity.getColor())
                .cut(entity.getCut())
                .level(entity.getLevel())
                .ct(entity.getCt())
                .price(entity.getPrice())
                .regdate(entity.getRegDate()).build();
        return dto;
    }


    public List<PriceSubuDto> getSubu(){
        List<PriceSubuDto> list = new ArrayList<>();
        priceSubuRepository.findAll().forEach(x-> list.add(subuEntityToDto(x)));
        return list;
    }

    private PriceSubuDto subuEntityToDto(PriceSubu entity){
        PriceSubuDto dto = PriceSubuDto.builder()
                .typ(entity.getTyp())
                .mm(entity.getMm())
                .price1(entity.getPrice1())
                .price2(entity.getPrice2())
                .price3(entity.getPrice3())
                .price4(entity.getPrice4())
                .price5(entity.getPrice5())
                .regdate(entity.getRegDate()).build();
        return dto;
    }

    public String registerGold(PriceGoldDto priceGoldDto){
        PriceGold priceGold = goldDtoToEntity(priceGoldDto);
        priceGoldRepository.save(priceGold);

        return "OK";
    }

    private PriceGold goldDtoToEntity(PriceGoldDto dto){
        PriceGold entity = PriceGold.builder()
                .typ(dto.getTyp())
                .vat(dto.getVat())
                .sell(dto.getSell())
                .buy(dto.getBuy()).build();
        return entity;
    }
}
