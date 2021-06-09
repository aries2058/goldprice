package com.dandj.jtoday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JtodayApplication {

    public static void main(String[] args) {
        SpringApplication.run(JtodayApplication.class, args);
    }

}
