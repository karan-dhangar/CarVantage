package com.carvantage.serviceImplts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carvantage.entity.CarVantageAppointmentEntity;
import com.carvantage.repo.CarVantageAppointmentRepo;
import com.carvantage.services.CarVantageAppointmentService;

@Service
public class CarVantageAppointmentServiceImpts implements CarVantageAppointmentService {
	 @Autowired
     private CarVantageAppointmentRepo repo;
     @Override
 	 public void add (CarVantageAppointmentEntity en) {
    	repo.save(en);
    }
    @Override
 	public List<CarVantageAppointmentEntity>getAll() {
     	return repo.findAll();
     }
    @Override
    public void deleteById(Long id) {
    	repo.deleteById(id);
    }
    @Override
    public CarVantageAppointmentEntity update(Long id, CarVantageAppointmentEntity en) {

        CarVantageAppointmentEntity existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id " + id));

        existing.setCustomerName(en.getCustomerName());
        existing.setCarModel(en.getCarModel());
        existing.setAppointmentStatus(en.getAppointmentStatus());
        existing.setAppointmentDate(en.getAppointmentDate());

        return repo.save(existing);
    }

}
