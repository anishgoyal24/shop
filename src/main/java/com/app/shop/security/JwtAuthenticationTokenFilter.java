package com.app.shop.security;

import com.app.shop.model.JwtAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationTokenFilter extends AbstractAuthenticationProcessingFilter {
    public  JwtAuthenticationTokenFilter() {
        super("/rest/**");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Token ")) {
            throw new RuntimeException("JWT Token is missing");
        }
        String authenticationToken = header.substring(6);
        JwtAuthenticationToken token = new JwtAuthenticationToken(authenticationToken);
        return this.getAuthenticationManager().authenticate(token);
    }

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }



    public void setAuthenticationSuccessHandler(JwtSuccessHandler jwtSuccessHandler) {
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        chain.doFilter(request, response);
    }

}
