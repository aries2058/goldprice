package com.dandj.goldprice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GoldpriceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GoldpriceApplication.class, args);
    }

}
