package com.dandj.jtoday.service.market;

import com.dandj.jtoday.dto.market.MarketDto;
import com.dandj.jtoday.entity.market.Market;
import com.dandj.jtoday.entity.market.MarketImages;
import com.dandj.jtoday.repository.market.MarketImagesRepository;
import com.dandj.jtoday.repository.market.MarketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService{
    private final MarketRepository marketRepository;
    private final MarketImagesRepository marketImagesRepository;

    @Override
    public Long register(MarketDto marketDto) {
        Market data = dtoToEntity(marketDto);
        marketRepository.save(data);
        if(!marketDto.getImage_ids().isEmpty()){
            marketDto.getImage_ids().forEach(x->{
                marketImagesRepository.save(dtoToMarketImageEntity(x, data));
            });
        }
        return data.getId();
    }

    @Override
    public List<MarketDto> getMarketList(MarketDto marketDto) {
        return null;
    }

    @Override
    public MarketDto getMarket(Long id) {
        Optional<Market> data = marketRepository.findMarketById(id);
        Optional<List<MarketImages>> images = marketImagesRepository.findMarketImagesByMarketId(id);
        if(data.isPresent()){
            MarketDto ret = entityToDto(data.get());
            List<Long> ids = new ArrayList<>();
            images.ifPresent(img->{
                img.forEach(x->{ids.add(x.getImageId());
                });
            });
            ret.setImage_ids(ids);
            return ret;
        }
        return new MarketDto();
    }
}
