package com.app.shop.security;

import com.app.shop.model.JwtUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

@Component
public class JwtValidator {
    public JwtUser validate(String token) {
        JwtUser jwtUser = null;
        try {
            Claims body = Jwts.parser().setSigningKey("riceapp").parseClaimsJws(token).getBody();
            jwtUser = new JwtUser();
            jwtUser.setUserName(body.getSubject());
            jwtUser.setId(Long.parseLong((String) body.get("userid")));
            jwtUser.setRole((String) body.get("role"));
        }
        catch (Exception e){
            System.out.println(e);
        }
        return jwtUser;
    }
}
