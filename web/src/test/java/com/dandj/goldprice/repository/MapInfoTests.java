package com.dandj.goldprice.repository;

import com.dandj.goldprice.entity.MapInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class MapInfoTests {
    @Autowired
    private MapInfoRepository mapInfoRepository;

    @Test
    public void test002(){
        Pageable pageable = PageRequest.of(0, 10);
        Page<MapInfo> result = mapInfoRepository.findAll(pageable);

        for(MapInfo mapInfo: result.getContent()){
            System.out.println(mapInfo);
        }
    }
}
