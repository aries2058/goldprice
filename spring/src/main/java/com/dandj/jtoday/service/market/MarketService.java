package com.dandj.jtoday.service.market;


import com.dandj.jtoday.dto.market.MarketDto;
import com.dandj.jtoday.dto.market.MarketMapDto;
import com.dandj.jtoday.entity.market.Market;
import com.dandj.jtoday.entity.market.MarketImages;
import com.dandj.jtoday.entity.market.MarketMap;

import java.util.List;

public interface MarketService {
    Long register(MarketDto marketDto);
    MarketDto getMarket(Long id);
    List<MarketMapDto> getMap();
    List<MarketDto> getMarketList(String searchVal, int sttPage, int perPage);
    List<MarketDto> getMarketListByTyp(String searchVal, int sttPage, int perPage);
    List<MarketDto> getMarketList(Long mapid);
    List<MarketDto> getHotMarketList();

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
                .mapId(dto.getMap_id())
                .itemTyp(dto.getItem_typ())
                .marketTyp(dto.getMarket_typ())
                .linkGoldpen(dto.getLink_goldpen())
                .linkHomepage(dto.getLink_homepage())
                .linkKakao(dto.getLink_kakao())
                .linkSns(dto.getLink_sns())
                .hotYn(dto.getHot_yn())
                .writer(dto.getWriter()).build();

        if(dto.getId() == null){

        }

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
                .map_id(entity.getMapId())
                .writer(entity.getWriter())
                .market_typ(entity.getMarketTyp())
                .item_typ(entity.getItemTyp())
                .link_goldpen(entity.getLinkGoldpen())
                .link_homepage(entity.getLinkHomepage())
                .link_kakao(entity.getLinkKakao())
                .link_sns(entity.getLinkSns())
                .hot_yn(entity.getHotYn())
                .regdt(entity.getRegDate())
                .moddt(entity.getModDate()).build();
        return dto;
    }
    default MarketDto entityToDto(Market entity, String image_path){
        MarketDto dto = MarketDto.builder()
                .id(entity.getId())
                .market_nm(entity.getMarketNm())
                .biz_no(entity.getBizNo())
                .addr(entity.getAddr())
                .addr_detail(entity.getAddrDetail())
                .tel(entity.getTel())
                .email(entity.getEmail())
                .contents(entity.getContents())
                .map_id(entity.getMapId())
                .writer(entity.getWriter())
                .market_typ(entity.getMarketTyp())
                .item_typ(entity.getItemTyp())
                .link_goldpen(entity.getLinkGoldpen())
                .link_homepage(entity.getLinkHomepage())
                .link_kakao(entity.getLinkKakao())
                .link_sns(entity.getLinkSns())
                .hot_yn(entity.getHotYn())
                .image_path(image_path)
                .regdt(entity.getRegDate())
                .moddt(entity.getModDate()).build();
        return dto;
    }

    default MarketMapDto entityToMarketMapDto(MarketMap entity, List<MarketDto> marketDto){
        MarketMapDto dto = MarketMapDto.builder()
                .id(entity.getId())
                .place_nm(entity.getPlaceNm())
                .addr(entity.getAddr())
                .addr_detail(entity.getAddrDetail())
                .lat(entity.getLat())
                .lng(entity.getLng())
                .use_yn(entity.getUseYn())
                .market(marketDto).build();
        return dto;
    }
    default MarketMap dtoToMarketMapEntity(MarketDto marketDto){
        MarketMap entity = MarketMap.builder()
                .placeNm(marketDto.getMarket_nm())
                .addr(marketDto.getAddr())
                .addrDetail(marketDto.getAddr_detail())
                .lat(marketDto.getLat())
                .lng(marketDto.getLng())
                .useYn("Y")
                .build();

        return entity;
    }

    default MarketImages dtoToMarketImageEntity(Long imageId, Market market){
        MarketImages entity = MarketImages.builder()
                .imageId(imageId)
                .market(market).build();
        return entity;
    }
}
