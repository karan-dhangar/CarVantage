package com.carvantage.services;

import java.util.List;

import com.carvantage.entity.CarVantageMechanicEntity;

public interface CarVantageMechanicService {
	public void add(CarVantageMechanicEntity en);
	public List<CarVantageMechanicEntity>getAll();
	public void deleteById(Long id);
	public CarVantageMechanicEntity update(Long id, CarVantageMechanicEntity en);

}
