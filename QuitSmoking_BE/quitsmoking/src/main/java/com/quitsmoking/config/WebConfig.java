package com.quitsmoking.config;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.context.annotation.Configuration;
=======
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
>>>>>>> d9771916ef21d7f9c4204541bf68445c0d61e038
=======
import org.springframework.context.annotation.Configuration;
>>>>>>> 2ab7ab5 (Deploy)
=======
import org.springframework.context.annotation.Configuration;
>>>>>>> 9ac8281 (First commit)
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(
                "http://localhost:4173",
                "http://localhost:3000",
                "http://localhost:5173",
                "https://demoquitsmoking-frontend.onrender.com",
                frontendUrl
            )
            .allowedMethods("*");
    }

>>>>>>> d9771916ef21d7f9c4204541bf68445c0d61e038
=======
>>>>>>> 2ab7ab5 (Deploy)
=======
>>>>>>> 9ac8281 (First commit)
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}