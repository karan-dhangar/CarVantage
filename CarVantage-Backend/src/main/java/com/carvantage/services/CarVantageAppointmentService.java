package com.carvantage.services;

import java.util.List;
import com.carvantage.entity.CarVantageAppointmentEntity;

public interface CarVantageAppointmentService {
	public void add(CarVantageAppointmentEntity en);
	public List<CarVantageAppointmentEntity>getAll();
	public void deleteById(Long id);
	public CarVantageAppointmentEntity update(Long id, CarVantageAppointmentEntity en);
}
