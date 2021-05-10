package com.dandj.goldprice.controller;

import com.dandj.goldprice.dto.CompDto;
import com.dandj.goldprice.dto.MapInfoDto;
import com.dandj.goldprice.dto.MemberDto;
import com.dandj.goldprice.dto.MemberFileDto;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.Member;
import com.dandj.goldprice.entity.MemberFile;
import com.dandj.goldprice.entity.MemberRole;
import com.dandj.goldprice.service.CompService;
import com.dandj.goldprice.service.MapService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequestMapping("api")
@RequiredArgsConstructor
public class CompController {
    private final MapService mapService;
    private final CompService compService;

    @GetMapping(value="/map/getMapInfo")
    public List<MapInfoDto> getMapInfo(){
        return mapService.getList();
    }

    @GetMapping(value="/comp/getCompList")
    public List<CompDto> getCompList(){
        return compService.getCompList();
    }

    @GetMapping(value="/comp/getCompInfo")
    public CompDto getCompInfo(String user_id){
        return compService.getCompInfo(user_id);
    }
    @GetMapping(value="/comp/getCompInfoByCompId")
    public CompDto getCompInfoByCompId(Long comp_id){
        return compService.getCompInfoByCompId(comp_id);
    }

    @PostMapping(value="/comp/register")
    public Long register(CompDto compDto){
        Long compId = compService.register(compDto);
        return compId;
    }


}
