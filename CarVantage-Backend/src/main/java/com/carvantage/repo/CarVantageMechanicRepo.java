package com.carvantage.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carvantage.entity.CarVantageMechanicEntity;

public interface CarVantageMechanicRepo extends JpaRepository<CarVantageMechanicEntity, Long> {
	Long countByIsAvailableTrue();
	 
	
}
