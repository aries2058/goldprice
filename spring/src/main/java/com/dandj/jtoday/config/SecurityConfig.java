package com.dandj.jtoday.config;


import com.dandj.jtoday.security.filter.ApiCheckFilter;
import com.dandj.jtoday.security.service.MemberDetailsService;
import com.dandj.jtoday.util.JWTUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@Log4j2
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private MemberDetailsService memberDetailsService;

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ApiCheckFilter apiCheckFilter(){
        return new ApiCheckFilter("/api/**/*", jwtUtil());
    }

//    @Bean
//    public ApiLoginFilter apiLoginFilter() throws Exception{
//        ApiLoginFilter apiLoginFilter = new ApiLoginFilter("/auth/login", jwtUtil());
//        apiLoginFilter.setAuthenticationManager(authenticationManager());
//
//        apiLoginFilter.setAuthenticationFailureHandler(new ApiLoginFailHandler());
//
//        return apiLoginFilter;
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin();
        http.csrf().disable();
        http.logout();

        http.addFilterBefore(apiCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        // 로그인 필요없는 화면
        http.authorizeRequests()
                .antMatchers("/main/*").permitAll()
                .antMatchers("/auth/*").permitAll()
                .antMatchers("/func/*").permitAll();

        //http.rememberMe().tokenValiditySeconds(60*60*7).userDetailsService(memberDetailsService);
    }

    @Bean
    public JWTUtil jwtUtil(){
        return new JWTUtil();
    }
}
