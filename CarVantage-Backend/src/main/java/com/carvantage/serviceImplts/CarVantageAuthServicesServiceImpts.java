package com.carvantage.serviceImplts;

import com.carvantage.dto.CarVantageAuthResponseDto;
import com.carvantage.dto.CarVantageLoginRequestDto;
import com.carvantage.entity.CarVantageRegisterEntity;
import com.carvantage.repo.CarVanatageRegisterRepo;
import com.carvantage.security.JwtUtils;
import com.carvantage.security.UserPrincipal;
import com.carvantage.services.CarVantageAuthServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CarVantageAuthServicesServiceImpts implements CarVantageAuthServicesService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final CarVanatageRegisterRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public CarVantageAuthResponseDto login(CarVantageLoginRequestDto loginRequest) {

    	System.out.println("/login service method called");
    	System.out.println(loginRequest.getEmail()+"   "+loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        
        System.out.println("Before : "+authentication.isAuthenticated());

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = jwtUtils.generateToken(principal);
        
        System.out.println("After : "+authentication.isAuthenticated());


        return new CarVantageAuthResponseDto(
                token,
                principal.getEmail()
        );
    }

    @Override
    public String register(CarVantageRegisterEntity registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        registerRequest.setPassword(
                passwordEncoder.encode(registerRequest.getPassword())
        );

        userRepository.save(registerRequest);

        return "User registered successfully!";
    }
}
