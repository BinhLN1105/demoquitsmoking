package com.quitsmoking.config;

import com.quitsmoking.model.LocalUser;
import com.quitsmoking.model.Role;
import com.quitsmoking.reponsitories.UserDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initDefaultAccounts(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        return args -> {
            // Create Admin account if not exists
            if (userDAO.findByUsername("admin").isEmpty()) {
                LocalUser admin = new LocalUser(
                    "admin",
                    passwordEncoder.encode("123123123"),
                    "admin@quitsmoking.com",
                    "Admin",
                    "System",
                    Role.ADMIN
                );
                userDAO.save(admin);
                logger.info("Admin account created (username: admin, password: 123123123)");
            } else {
                logger.info("Admin account already exists, skipping creation.");
            }

            // Create Coach account if not exists
            if (userDAO.findByUsername("coach").isEmpty()) {
                LocalUser coach = new LocalUser(
                    "coach",
                    passwordEncoder.encode("123123123"),
                    "coach@quitsmoking.com",
                    "Coach",
                    "System",
                    Role.COACH
                );
                userDAO.save(coach);
                logger.info("Coach account created (username: coach, password: 123123123)");
            } else {
                logger.info("Coach account already exists, skipping creation.");
            }
        };
    }
}
