package com.carvantage.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carvantage.entity.CarVantageInvoiceEntity;

public interface CarVantageInvoiceRepo extends JpaRepository<CarVantageInvoiceEntity, Long> {

}
