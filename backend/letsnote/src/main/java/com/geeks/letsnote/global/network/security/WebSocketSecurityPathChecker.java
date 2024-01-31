package com.geeks.letsnote.global.network.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.AntPathMatcher;

@Configuration
public class WebSocketSecurityPathChecker {
    @Bean
    public AntPathMatcher antPathMatcher(){
        return new AntPathMatcher();
    }
}
