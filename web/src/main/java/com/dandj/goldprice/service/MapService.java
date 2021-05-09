package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.MapInfoDto;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.repository.CompRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapService {

    private final CompRepository compRepository;

    public List<MapInfoDto> getList(){
        List<MapInfoDto> list = new ArrayList<>();

        compRepository.findAll().forEach(v -> list.add(entityToDto(v)));

        return list;
    }

    private MapInfoDto entityToDto(Comp entity){
        MapInfoDto dto = MapInfoDto.builder()
                .id(entity.getId())
                .place_nm(entity.getPlaceNm())
                .addr(entity.getAddr())
                .tel(entity.getTel())
                .imgUrl(entity.getImgUrl())
                .lat(entity.getLat())
                .lng(entity.getLng()).build();
        return dto;
    }
}
