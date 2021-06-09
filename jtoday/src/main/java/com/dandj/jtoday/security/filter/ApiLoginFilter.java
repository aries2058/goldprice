package com.dandj.jtoday.security.filter;


import com.dandj.jtoday.dto.security.AuthDto;
import com.dandj.jtoday.util.JWTUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class ApiLoginFilter extends AbstractAuthenticationProcessingFilter {

    private JWTUtil jwtUtil;

    public ApiLoginFilter(String defaultFilterProcessUrl, JWTUtil jwtUtil){

        super(defaultFilterProcessUrl);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        log.info("------------------------------ ApiLoginFilter ------------------------------ ");
        log.info("attemptAuthentication");

        String userid = request.getParameter("userid");
        String pw = request.getParameter("pw");

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userid, pw);

        if (userid == null) {
            throw new BadCredentialsException("userid cannot be null");
        }
        log.info(authToken);
        return getAuthenticationManager().authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        log.info("----------- ApiLoginFiter ----------- ");
        log.info("successfulAuthentication: " + authResult);
        log.info(authResult.getPrincipal());

        String userid = ((AuthDto)authResult.getPrincipal()).getUsername();
        log.info("=============userid: " + userid);
        String token = null;
        try{
            token = jwtUtil.generateToken(userid);

            response.setContentType("text/plain");
            response.getOutputStream().write(token.getBytes());

            log.info(token);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
