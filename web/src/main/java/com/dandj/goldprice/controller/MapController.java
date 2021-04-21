package com.dandj.goldprice.controller;

import com.dandj.goldprice.dto.MapInfoDTO;
import com.dandj.goldprice.entity.MapInfo;
import com.dandj.goldprice.repository.MapInfoRepository;
import com.dandj.goldprice.service.MapService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("api")
@RequiredArgsConstructor
public class MapController {
    private final MapService service;

    @GetMapping(value="/map/getMapInfo")
    public List<MapInfoDTO> getMapInfo(){

        return service.getList();
    }
//
//    @GetMapping(value="/map/getMapInfoList")
//    public List<MapInfo> getMapInfoList(){
//        Pageable pageable = PageRequest.of(0, 10);
//        Page<MapInfo> result = mapInfoRepository.findAll(pageable);
//
//        return result.getContent();
//    }
}
