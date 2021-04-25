package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.MapInfoDto;
import com.dandj.goldprice.dto.MemberDto;
import com.dandj.goldprice.entity.MapInfo;
import com.dandj.goldprice.entity.Member;
import com.dandj.goldprice.repository.MapInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MapService {

    private final MapInfoRepository mapInfoRepository;

    public List<MapInfoDto> getList(){
        List<MapInfoDto> list = new ArrayList<>();

        mapInfoRepository.findAll().forEach(v -> list.add(entityToDto(v)));

        return list;
    }

    private MapInfoDto entityToDto(MapInfo entity){
        MapInfoDto dto = MapInfoDto.builder()
                .id(entity.getMapInfoId())
                .place_nm(entity.getPlaceNm())
                .addr(entity.getAddr())
                .lat(entity.getLat())
                .lng(entity.getLng()).build();
        return dto;
    }
}
