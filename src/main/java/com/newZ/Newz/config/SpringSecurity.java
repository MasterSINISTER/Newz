package com.newZ.Newz.config;


import com.newZ.Newz.services.UserDetailServiceImp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity

public class SpringSecurity {
    private UserDetailServiceImp userDetailServiceImp;
    public SpringSecurity(UserDetailServiceImp userDetailServiceImp) {
        this.userDetailServiceImp = userDetailServiceImp;
        System.out.println("SpringSecurity configuration initialized.");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("Configuring SecurityFilterChain...");
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**","/user/**").authenticated() // Protect specific endpoints
                        .requestMatchers("/admin/**").hasAnyRole("ADMIN")
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults())  // Using HTTP Basic Authentication
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults()); // Disable CSRF (if it's an API or stateless)

        System.out.println("SecurityFilterChain configured.");
        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        System.out.println("Configuring AuthenticationProvider...");
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailServiceImp);
        authProvider.setPasswordEncoder(passwordEncoder());
        System.out.println("AuthenticationProvider configured.");
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        System.out.println("AuthenticationManager bean initialized.");
        return authenticationConfiguration.getAuthenticationManager();
    }

}
