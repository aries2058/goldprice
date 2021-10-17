package com.dandj.jtoday.service.market;

import com.dandj.jtoday.dto.market.MarketDto;
import com.dandj.jtoday.dto.market.MarketMapDto;
import com.dandj.jtoday.entity.comm.Board;
import com.dandj.jtoday.entity.market.Market;
import com.dandj.jtoday.entity.market.MarketImages;
import com.dandj.jtoday.entity.market.MarketMap;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.repository.market.MarketImagesRepository;
import com.dandj.jtoday.repository.market.MarketMapRepository;
import com.dandj.jtoday.repository.market.MarketRepository;
import com.dandj.jtoday.repository.member.MemberRepository;
import com.dandj.jtoday.spec.BoardSpec;
import com.dandj.jtoday.spec.MarketSpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
    private final MarketMapRepository marketMapRepository;

    @Override
    public Long register(MarketDto marketDto) {
        Market data = dtoToEntity(marketDto);
        if(marketDto.getId() == 0){
            data.setId(null);
        }
        Optional<MarketMap> map = marketMapRepository.findMarketByAddr(marketDto.getAddr());
        if(map.isPresent()){
            data.setMapId(map.get().getId());
        }
        marketRepository.save(data);

        if(!marketDto.getImage_ids().isEmpty()){
            Optional<List<MarketImages>> imgs = marketImagesRepository.findMarketImagesByMarketId(marketDto.getId());
            imgs.ifPresent(x-> x.forEach(img->{
                marketImagesRepository.delete(img);
            }));
            marketDto.getImage_ids().forEach(x->{
                marketImagesRepository.save(dtoToMarketImageEntity(x, data));
            });
        }
        return data.getId();
    }

    @Override
    public MarketDto getMarket(Long id) {
        Optional<Market> data = marketRepository.findMarketById(id);
        Optional<List<MarketImages>> images = marketImagesRepository.findMarketImagesByMarketId(id);
        if(data.isPresent()){
            MarketDto ret = entityToDto(data.get());
            if(data.get().getMapId() > 0){
                Optional<MarketMap> map = marketMapRepository.findById(data.get().getMapId());
                ret.setLat(map.get().getLat());
                ret.setLng(map.get().getLng());
            }
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

    @Override
    public List<MarketMapDto> getMap(){
        List<MarketMap> data = marketMapRepository.findAll();
        List<MarketMapDto> ret = new ArrayList<>();

        data.forEach(x->{
            Optional<List<Market>> market = marketRepository.findMarketsByMapId(x.getId());
            List<MarketDto> markets = new ArrayList<>();
            if(market.isPresent()){
                market.get().forEach(m->{
                    markets.add(entityToDto(m));
                });
            }
            ret.add(entityToMarketMapDto(x, markets));
        });
        return ret;
    }


    @Override
    public List<MarketDto> getHotMarketList() {
        List<MarketDto> ret = new ArrayList<>();
        Optional<List<Market>> market = marketRepository.findMarketsByHotYn("Y");
        market.ifPresent(x->{
            x.forEach(m->{
                ret.add(entityToDto(m, marketImagesRepository.findMarketImageByMarketId(m.getId())));
            });
        });

        return ret;
    }
    @Override
    public List<MarketDto> getMarketList(String searchVal, int sttPage, int perPage) {
        List<MarketDto> ret = new ArrayList<>();
        Pageable pageable = PageRequest.of(sttPage, perPage);

        if(searchVal.isEmpty()){
            Optional<List<Market>> data = marketRepository.findMarketsBy(pageable);

            data.ifPresent(x->{
                x.forEach(m->{
                    ret.add(entityToDto(m, marketImagesRepository.findMarketImageByMarketId(m.getId())));
                });
            });
        }else{
            Specification<Market> spec = Specification.where(MarketSpec.marketNmLike(searchVal));
            spec.or(Specification.where(MarketSpec.contentsLike(searchVal)));
            Page<Market> data = marketRepository.findAll(spec, pageable);

            data.forEach(x->{
                ret.add(entityToDto(x, marketImagesRepository.findMarketImageByMarketId(x.getId())));
            });
        }
        return ret;
    }
    @Override
    public List<MarketDto> getMarketListByTyp(String searchVal, int sttPage, int perPage) {
        List<MarketDto> ret = new ArrayList<>();
        Pageable pageable = PageRequest.of(sttPage, perPage);

        if(searchVal.isEmpty()){
            Optional<List<Market>> data = marketRepository.findMarketsBy(pageable);

            data.ifPresent(x->{
                x.forEach(m->{
                    ret.add(entityToDto(m, marketImagesRepository.findMarketImageByMarketId(m.getId())));
                });
            });
        }else{
            Specification<Market> spec = Specification.where(MarketSpec.itemTypLike(searchVal));

            Page<Market> data = marketRepository.findAll(spec, pageable);

            data.forEach(x->{
                ret.add(entityToDto(x, marketImagesRepository.findMarketImageByMarketId(x.getId())));
            });
        }
        return ret;
    }


    @Override
    public List<MarketDto> getMarketList(Long mapid) {
        Optional<List<Market>> data = marketRepository.findMarketsByMapId(mapid);
        List<MarketDto> ret = new ArrayList<>();
        data.ifPresent(x->{
            x.forEach(m->{
                ret.add(entityToDto(m));
            });
        });
        return ret;
    }
}
