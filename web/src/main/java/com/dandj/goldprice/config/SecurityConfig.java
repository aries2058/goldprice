package com.dandj.goldprice.config;


import com.dandj.goldprice.handler.ApiLoginFailHandler;
import com.dandj.goldprice.security.filter.ApiCheckFilter;
import com.dandj.goldprice.security.filter.ApiLoginFilter;
import com.dandj.goldprice.util.JWTUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@Log4j2
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ApiCheckFilter apiCheckFilter(){
        return new ApiCheckFilter("/api/**/*", jwtUtil());
    }

    @Bean
    public ApiLoginFilter apiLoginFilter() throws Exception{
        ApiLoginFilter apiLoginFilter = new ApiLoginFilter("/api/login", jwtUtil());
        apiLoginFilter.setAuthenticationManager(authenticationManager());

        apiLoginFilter.setAuthenticationFailureHandler(new ApiLoginFailHandler());

        return apiLoginFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin();
        http.csrf().disable();
        http.logout();

        http.addFilterBefore(apiCheckFilter(), UsernamePasswordAuthenticationFilter.class);
        //http.addFilterBefore(apiLoginFilter(), UsernamePasswordAuthenticationFilter.class);

        http.authorizeRequests().antMatchers("**/*").permitAll();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//        auth.inMemoryAuthentication().withUser("user1")
//                .password("$2a$10$FEYFOPCo5EFxt37xNRFvM.ubdFFScVOlCOJIVVkvF0VWht4zXtNnG")
//                .roles("USER");
//    }

    @Bean
    public JWTUtil jwtUtil(){
        return new JWTUtil();
    }
}
