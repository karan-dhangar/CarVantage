package com.carvantage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carvantage.entity.CarVantageServicesEntity;
import com.carvantage.services.CarVantageServicesService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarVantageServicesController {
	   @Autowired
	   private CarVantageServicesService service;
	   @PostMapping("/services")
	   public ResponseEntity add(@RequestBody CarVantageServicesEntity en) {
		   service.add(en);
		   return ResponseEntity
	               .status(HttpStatus.CREATED)
	               .body("Service added successfully");
		   
	   }
	   @GetMapping("/services")
	   public ResponseEntity<List<CarVantageServicesEntity>> get(){
		  List<CarVantageServicesEntity> ls =service.getAll();
		  return ResponseEntity.ok(ls);
	   }  
	   @DeleteMapping("/services/{id}")
	   public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
	       service.deleteById(id);
	       return ResponseEntity.ok("Service deleted successfully");
	   }
	   @PutMapping("/services/{id}")
	   public ResponseEntity<CarVantageServicesEntity> updateService(
	           @PathVariable Long id,
	           @RequestBody CarVantageServicesEntity en) {

	       CarVantageServicesEntity updated = service.update(id, en);
	       return ResponseEntity.ok(updated);
	   }

	   
}
