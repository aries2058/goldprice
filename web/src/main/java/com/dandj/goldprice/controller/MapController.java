package com.dandj.goldprice.controller;

import com.dandj.goldprice.dto.MapInfoDto;
import com.dandj.goldprice.service.MapService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
    public List<MapInfoDto> getMapInfo(){

        return service.getList();
    }
}
