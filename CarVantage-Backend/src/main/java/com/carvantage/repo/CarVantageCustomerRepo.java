package com.carvantage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carvantage.entity.CarVantageCustomerEntity;

@Repository
public interface CarVantageCustomerRepo extends JpaRepository<CarVantageCustomerEntity, Long> {

}
