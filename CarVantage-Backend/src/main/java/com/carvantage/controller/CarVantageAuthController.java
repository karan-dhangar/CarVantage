package com.carvantage.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.carvantage.dto.ApiResponse;
import com.carvantage.dto.CarVantageAuthResponseDto;
import com.carvantage.dto.CarVantageLoginRequestDto;
import com.carvantage.entity.CarVantageRegisterEntity;
import com.carvantage.services.CarVantageAuthServicesService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CarVantageAuthController {

    private final CarVantageAuthServicesService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody CarVantageLoginRequestDto loginRequest) {
    	System.out.println("/login called");
    	System.out.println(loginRequest.getEmail()+"   "+loginRequest.getPassword());
        CarVantageAuthResponseDto response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CarVantageRegisterEntity registerRequest) {
        String response = authService.register(registerRequest);
        return ResponseEntity.ok(new ApiResponse("Success", response));
    }
}