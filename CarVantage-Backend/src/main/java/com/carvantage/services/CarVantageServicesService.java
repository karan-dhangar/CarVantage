package com.carvantage.services;

import java.util.List;

import com.carvantage.entity.CarVantageServicesEntity;

public interface CarVantageServicesService {
	public void add(CarVantageServicesEntity en);
	public List<CarVantageServicesEntity>getAll();
	public void deleteById(Long id);
	public CarVantageServicesEntity update(Long id, CarVantageServicesEntity en);

}
