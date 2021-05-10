package com.dandj.goldprice.repository;

import com.dandj.goldprice.dto.CompDto;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.service.CompService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


@SpringBootTest
public class CompInfoTests {

    @Autowired
    CompRepository repository;

    @Autowired
    CompService compService;

    @Test
    public void test001(){
        Comp comp = repository.findCompByUserId("system");
        System.out.println(comp);
    }
    @Test
    public void test002(){
        CompDto comp = compService.getCompInfo("system");
        System.out.println(comp);
    }
}
