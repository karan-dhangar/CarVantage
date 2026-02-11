package com.carvantage.services;

import com.carvantage.dto.CarVantageAuthResponseDto;
import com.carvantage.dto.CarVantageLoginRequestDto;
import com.carvantage.entity.CarVantageRegisterEntity;

public interface CarVantageAuthServicesService {
	CarVantageAuthResponseDto login(CarVantageLoginRequestDto loginRequest);

    String register(CarVantageRegisterEntity registerRequest);
}
