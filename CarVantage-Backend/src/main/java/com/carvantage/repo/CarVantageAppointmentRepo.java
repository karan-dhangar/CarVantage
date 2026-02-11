package com.carvantage.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carvantage.entity.CarVantageAppointmentEntity;

public interface CarVantageAppointmentRepo extends JpaRepository<CarVantageAppointmentEntity, Long> {
	Long countByAppointmentStatus(String appointmentStatus);

    List<CarVantageAppointmentEntity> findTop5ByOrderByAppointmentDateAsc();
	
	
}
