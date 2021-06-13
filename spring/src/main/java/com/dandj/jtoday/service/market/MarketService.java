package com.dandj.jtoday.service.market;


import com.dandj.jtoday.dto.market.MarketDto;
import com.dandj.jtoday.entity.market.Market;
import com.dandj.jtoday.entity.market.MarketImages;

import java.util.List;

public interface MarketService {
    Long register(MarketDto marketDto);
    List<MarketDto> getMarketList(MarketDto marketDto);
    MarketDto getMarket(Long id);

    default Market dtoToEntity(MarketDto dto){
        Market entity = Market.builder()
                .id(dto.getId())
                .marketNm(dto.getMarket_nm())
                .bizNo(dto.getBiz_no())
                .addr(dto.getAddr())
                .addrDetail(dto.getAddr_detail())
                .contents(dto.getContents())
                .email(dto.getEmail())
                .tel(dto.getTel())
                .imageId(dto.getImage_id())
                .itemTyp(dto.getItem_typ())
                .marketTyp(dto.getMarket_typ())
                .writer(dto.getWriter()).build();

        return entity;
    }

    default MarketDto entityToDto(Market entity){
        MarketDto dto = MarketDto.builder()
                .id(entity.getId())
                .market_nm(entity.getMarketNm())
                .biz_no(entity.getBizNo())
                .addr(entity.getAddr())
                .addr_detail(entity.getAddrDetail())
                .tel(entity.getTel())
                .email(entity.getEmail())
                .contents(entity.getContents())
                .image_id(entity.getImageId())
                .map_id(entity.getMapId())
                .writer(entity.getWriter())
                .market_typ(entity.getMarketTyp())
                .item_typ(entity.getItemTyp())
                .regdt(entity.getRegDate())
                .moddt(entity.getModDate()).build();
        return dto;
    }

    default MarketImages dtoToMarketImageEntity(Long imageId, Market market){
        MarketImages entity = MarketImages.builder()
                .imageId(imageId)
                .market(market).build();
        return entity;
    }
}
