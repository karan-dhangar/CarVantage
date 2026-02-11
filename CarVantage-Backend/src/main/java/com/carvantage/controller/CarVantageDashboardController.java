package com.carvantage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carvantage.entity.CarVantageDashboard;
import com.carvantage.services.CarVantageDashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class CarVantageDashboardController {
	@Autowired
    private CarVantageDashboardService dashboardService;

    @GetMapping
    public CarVantageDashboard getDashboard() {
        return dashboardService.getDashboardData();
    }
}
