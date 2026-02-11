package com.carvantage.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carvantage.entity.CarVantageServicesEntity;

public interface CarVantageServicesRepo extends JpaRepository<CarVantageServicesEntity, Long> {
	List<CarVantageServicesEntity> findTop5ByOrderByServiceDateDesc();

}
