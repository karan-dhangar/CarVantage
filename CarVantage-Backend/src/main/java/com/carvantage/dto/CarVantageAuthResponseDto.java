package com.carvantage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarVantageAuthResponseDto {
	private String token;
    private String username;
}
