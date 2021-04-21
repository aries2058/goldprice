package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.MapInfoDTO;
import com.dandj.goldprice.entity.MapInfo;
import com.dandj.goldprice.repository.MapInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapService {

    private final MapInfoRepository mapInfoRepository;

    public List<MapInfoDTO> getList(){
        List<MapInfoDTO> result = new ArrayList<>();

        for(MapInfo mapInfo:mapInfoRepository.findAll()){
            result.add(entityToDto(mapInfo));
        }

        return result;
    }

    private MapInfoDTO entityToDto(MapInfo entity){
        MapInfoDTO dto = MapInfoDTO.builder()
                .id(entity.getMapInfoId())
                .place_nm(entity.getPlaceNm())
                .addr(entity.getAddr())
                .lat(entity.getLat())
                .lng(entity.getLng()).build();
        return dto;
    }

}
