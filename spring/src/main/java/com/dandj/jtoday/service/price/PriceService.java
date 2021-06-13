package com.dandj.jtoday.service.price;

import com.dandj.jtoday.dto.price.PriceDiaDto;
import com.dandj.jtoday.dto.price.PriceGoldDto;
import com.dandj.jtoday.dto.price.PricePearlDto;
import com.dandj.jtoday.dto.price.PriceSubuDto;
import com.dandj.jtoday.entity.price.PriceDia;
import com.dandj.jtoday.entity.price.PriceGold;
import com.dandj.jtoday.entity.price.PricePearl;
import com.dandj.jtoday.entity.price.PriceSubu;

import java.util.List;

public interface PriceService {
    List<PriceGoldDto> getGold(String typ);
    void registerGold(PriceGoldDto priceGoldDto);

    List<PriceDiaDto> getDia();
    List<PriceSubuDto> getSubu();
    List<PricePearlDto> getPearl();

    default PriceGoldDto goldEntityToDto(PriceGold entity){
        PriceGoldDto dto = PriceGoldDto.builder()
                .typ(entity.getTyp())
                .vat(entity.getVat())
                .sell(entity.getSell())
                .buy(entity.getBuy())
                .regdt(entity.getModDate()).build();
        return dto;
    }

    default PriceGold goldDtoToEntity(PriceGoldDto dto){
        PriceGold entity = PriceGold.builder()
                .typ(dto.getTyp())
                .vat(dto.getVat())
                .sell(dto.getSell())
                .buy(dto.getBuy()).build();
        return entity;
    }

    default PriceDiaDto diaEntityToDto(PriceDia entity){
        PriceDiaDto dto = PriceDiaDto.builder()
                .app(entity.getApp())
                .color(entity.getColor())
                .cut(entity.getCut())
                .level(entity.getLevel())
                .ct(entity.getCt())
                .price(entity.getPrice())
                .regdt(entity.getModDate()).build();
        return dto;
    }

    default PriceSubuDto subuEntityToDto(PriceSubu entity){
        PriceSubuDto dto = PriceSubuDto.builder()
                .typ(entity.getTyp())
                .mm(entity.getMm())
                .price1(entity.getPrice1())
                .price2(entity.getPrice2())
                .price3(entity.getPrice3())
                .price4(entity.getPrice4())
                .price5(entity.getPrice5())
                .regdt(entity.getModDate()).build();
        return dto;
    }

    default PricePearlDto pearlEntityToDto(PricePearl entity){
        PricePearlDto dto = PricePearlDto.builder()
                .typ(entity.getTyp())
                .mm(entity.getMm())
                .min(entity.getMin())
                .max(entity.getMax())
                .regdt(entity.getModDate()).build();
        return dto;
    }
}
