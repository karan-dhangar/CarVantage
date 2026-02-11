package com.carvantage.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carvantage.entity.CarVantageRegisterEntity;

public interface CarVanatageRegisterRepo extends JpaRepository<CarVantageRegisterEntity, Long> {

	Optional<CarVantageRegisterEntity> findByEmail(String email);
	boolean existsByEmail(String email);

}
