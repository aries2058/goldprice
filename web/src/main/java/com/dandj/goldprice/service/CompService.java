package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.*;
import com.dandj.goldprice.entity.*;
import com.dandj.goldprice.repository.CompRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CompService {
    private final CompRepository compRepository;

    public CompDto getCompInfo(String id){
        Comp comp = compRepository.findCompByUserId(id);
        return comp == null ? new CompDto() : compEntityToDto(comp);
    }

    private CompDto compEntityToDto(Comp entity){
        CompDto dto = CompDto.builder()
                .comp_id(entity.getId())
                .place_nm(entity.getPlaceNm())
                .addr(entity.getAddr())
                .addrDetail(entity.getAddrDetail())
                .contents(entity.getContents())
                .imgUrl(entity.getImgUrl())
                .tel(entity.getTel())
                .imgUrl(entity.getImgUrl())
                .lat(entity.getLat())
                .lng(entity.getLng())
                .user_id(entity.getUserId()).build();
        return dto;
    }

    public Long register(CompDto compDto){
        Map<String, Object> entityMap = dtoToEntity(compDto);
        Comp comp = (Comp) entityMap.get("comp");
        compRepository.save(comp);

        return comp.getId();
    }

    private Map<String, Object> dtoToEntity(CompDto compDto){
        Map<String, Object> entityMap = new HashMap<>();
        Comp comp = Comp.builder()
                .id(compDto.getComp_id())
                .placeNm(compDto.getPlace_nm())
                .tel(compDto.getTel())
                .imgUrl(compDto.getImgUrl())
                .contents(compDto.getContents())
                .addr(compDto.getAddr())
                .addrDetail(compDto.getAddrDetail())
                .lat(compDto.getLat())
                .lng(compDto.getLng())
                .useYn("Y")
                .userId(compDto.getUser_id()).build();
        entityMap.put("comp", comp);

        return entityMap;
    }
}
