package com.carvantage.serviceImplts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carvantage.entity.CarVantageServicesEntity;
import com.carvantage.repo.CarVantageServicesRepo;
import com.carvantage.services.CarVantageServicesService;


@Service
public class CarVantageServicesServiceImplts implements CarVantageServicesService {
	@Autowired
    private CarVantageServicesRepo repo;
    @Override
	 public void add (CarVantageServicesEntity en) {
   	repo.save(en);
   }
   @Override
	public List<CarVantageServicesEntity>getAll() {
    	return repo.findAll();
    }
   @Override
   public void deleteById(Long id) {
   	repo.deleteById(id);
   }
   @Override
   public CarVantageServicesEntity update(Long id, CarVantageServicesEntity en) {

       CarVantageServicesEntity existing = repo.findById(id)
               .orElseThrow(() -> new RuntimeException("Service not found with id " + id));

       existing.setServiceName(en.getServiceName());
       existing.setPrice(en.getPrice());
       existing.setTimeRequired(en.getTimeRequired());
       existing.setServiceDate(en.getServiceDate());

       return repo.save(existing);
   }

}
