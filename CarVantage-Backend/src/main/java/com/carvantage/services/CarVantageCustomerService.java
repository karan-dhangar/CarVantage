package com.carvantage.services;

import java.util.List;

import com.carvantage.entity.CarVantageCustomerEntity;

public interface CarVantageCustomerService {
	public void add(CarVantageCustomerEntity en);
	public List<CarVantageCustomerEntity>getAll();
	public void deleteById(Long id);
	public CarVantageCustomerEntity update(Long id, CarVantageCustomerEntity en);

}
