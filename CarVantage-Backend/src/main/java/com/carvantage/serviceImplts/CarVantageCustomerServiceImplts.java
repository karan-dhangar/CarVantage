package com.carvantage.serviceImplts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carvantage.entity.CarVantageCustomerEntity;
import com.carvantage.entity.CarVantageRegisterEntity;
import com.carvantage.repo.CarVanatageRegisterRepo;
import com.carvantage.repo.CarVantageCustomerRepo;
import com.carvantage.services.CarVantageCustomerService;


@Service
public class CarVantageCustomerServiceImplts implements CarVantageCustomerService {
     @Autowired
     private CarVantageCustomerRepo repo;
     @Override
 	 public void add (CarVantageCustomerEntity en) {
    	repo.save(en);
    }
    @Override
 	public List<CarVantageCustomerEntity>getAll() {
     	return repo.findAll();
     }
    @Override
    public void deleteById(Long id) {
    	repo.deleteById(id);
    }
    @Override
    public CarVantageCustomerEntity update(Long id, CarVantageCustomerEntity en) {

        CarVantageCustomerEntity existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id " + id));

        existing.setCustomerName(en.getCustomerName());
        existing.setEmail(en.getEmail());
        existing.setMobileNumber(en.getMobileNumber());
        existing.setCarModel(en.getCarModel());

        return repo.save(existing);
    }

	 
}
