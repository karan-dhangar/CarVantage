package com.carvantage.serviceImplts;

import java.util.List;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carvantage.entity.CarVantageMechanicEntity;
import com.carvantage.repo.CarVantageMechanicRepo;
import com.carvantage.services.CarVantageMechanicService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class CarVantageMechanicServiceImplts implements CarVantageMechanicService {
     
     private CarVantageMechanicRepo repo;
 
 	 public void add (CarVantageMechanicEntity en) {
    	repo.save(en);
    }
    @Override
 	public List<CarVantageMechanicEntity>getAll() {
     	return repo.findAll();
     }
    @Override
    public void deleteById(Long id) {
    	repo.deleteById(id);
    }
    @Override
    public CarVantageMechanicEntity update(Long id, CarVantageMechanicEntity en) {

        CarVantageMechanicEntity existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mechanic not found with id " + id));

        existing.setMechanicName(en.getMechanicName());
        existing.setExpertise(en.getExpertise());
        existing.setMobileNumber(en.getMobileNumber());
        existing.setAvailable(en.isAvailable());

        return repo.save(existing);
    }

	 
}
