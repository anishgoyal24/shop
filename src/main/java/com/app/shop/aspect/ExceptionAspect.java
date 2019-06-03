package com.app.shop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ExceptionAspect {

    private Logger logger = LoggerFactory.getLogger(ExceptionAspect.class);

    @AfterThrowing(pointcut = "execution(* com.app.shop.*.*(..))", throwing = "exception")
    public void afterThrowing(JoinPoint joinPoint, Throwable exception){
        logger.error(joinPoint.getSignature().getName(), exception);
        System.out.println("here");
    }

}
