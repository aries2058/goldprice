package com.dandj.jtoday.service.price;

import com.dandj.jtoday.dto.price.PriceDiaDto;
import com.dandj.jtoday.dto.price.PriceGoldDto;
import com.dandj.jtoday.dto.price.PricePearlDto;
import com.dandj.jtoday.dto.price.PriceSubuDto;
import com.dandj.jtoday.entity.price.PriceGold;
import com.dandj.jtoday.repository.price.PriceDiaRepository;
import com.dandj.jtoday.repository.price.PriceGoldRepository;
import com.dandj.jtoday.repository.price.PricePearlRepository;
import com.dandj.jtoday.repository.price.PriceSubuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class PriceServiceImpl implements PriceService {
    private final PriceGoldRepository priceGoldRepository;
    private final PriceDiaRepository priceDiaRepository;
    private final PriceSubuRepository priceSubuRepository;
    private final PricePearlRepository pricePearlRepository;

    @Override
    public List<PriceGoldDto> getGold(String typ) {
        List<PriceGoldDto> ret = new ArrayList<>();
        if(typ != null && !typ.isEmpty()){
            priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc(typ).ifPresent(x->{
                ret.add(goldEntityToDto(x.get(0)));
            });
        }else{
            priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc("G").ifPresent(x->{
                if(x.size() > 0){
                    ret.add(goldEntityToDto(x.get(0)));
                }
            });
            priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc("S").ifPresent(x->{
                if(x.size() > 0){
                    ret.add(goldEntityToDto(x.get(0)));
                }
            });
            priceGoldRepository.findPriceGoldByTypOrderByRegDateDesc("W").ifPresent(x->{
                if(x.size() > 0){
                    ret.add(goldEntityToDto(x.get(0)));
                }
            });
        }
        return ret;
    }

    @Override
    public void registerGold(PriceGoldDto priceGoldDto) {
        PriceGold priceGold = goldDtoToEntity(priceGoldDto);
        priceGoldRepository.save(priceGold);
    }

    @Override
    public List<PriceDiaDto> getDia() {
        List<PriceDiaDto> ret = new ArrayList<>();
        priceDiaRepository.findAll().forEach(x-> ret.add(diaEntityToDto(x)));
        return ret;
    }

    @Override
    public List<PriceSubuDto> getSubu() {
        List<PriceSubuDto> ret = new ArrayList<>();
        priceSubuRepository.findAll().forEach(x-> ret.add(subuEntityToDto(x)));
        return ret;
    }

    @Override
    public List<PricePearlDto> getPearl() {
        List<PricePearlDto> list = new ArrayList<>();
        pricePearlRepository.findAll().forEach(x-> list.add(pearlEntityToDto(x)));
        return list;
    }
}
