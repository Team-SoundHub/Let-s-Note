package com.geeks.letsnote.global.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsFilterConfig {
    private static final String[] AUTH_WHITELIST = {
            "/api/**"
    };

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        for (String path : AUTH_WHITELIST) {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("https://www.letsnote.co.kr");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

            source.registerCorsConfiguration(path, config);
        }

        return new CorsFilter(source);
    }

}