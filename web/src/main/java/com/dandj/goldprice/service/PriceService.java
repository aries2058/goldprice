package com.dandj.goldprice.service;

import com.dandj.goldprice.GoldpriceApplication;
import com.dandj.goldprice.dto.CompDto;
import com.dandj.goldprice.dto.MemberDto;
import com.dandj.goldprice.dto.PriceGoldDto;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.PriceGold;
import com.dandj.goldprice.repository.CompRepository;
import com.dandj.goldprice.repository.PriceGoldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PriceService {
    private final PriceGoldRepository priceGoldRepository;

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
                .avg(entity.getAvg())
                .sell(entity.getSell())
                .buy(entity.getBuy())
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
                .avg(dto.getAvg())
                .sell(dto.getSell())
                .buy(dto.getBuy()).build();
        return entity;
    }
}
