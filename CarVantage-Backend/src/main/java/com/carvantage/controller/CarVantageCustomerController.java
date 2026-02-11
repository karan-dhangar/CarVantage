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

import com.carvantage.entity.CarVantageCustomerEntity;
import com.carvantage.services.CarVantageCustomerService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarVantageCustomerController {
	   @Autowired
	   private CarVantageCustomerService service;
	   @PostMapping("/customer")
	   public ResponseEntity add(@RequestBody CarVantageCustomerEntity en) {
		   service.add(en);
		   return ResponseEntity
	               .status(HttpStatus.CREATED)
	               .body("Customer added successfully");
		   
	   }
	   @GetMapping("/customer")
	   public ResponseEntity<List<CarVantageCustomerEntity>> get(){
		  List<CarVantageCustomerEntity> ls =service.getAll();
		  return ResponseEntity.ok(ls);
	   }  
	   @DeleteMapping("/customer/{id}")
	   public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
	       service.deleteById(id);
	       return ResponseEntity.ok("Customer deleted successfully");
	   }
	   @PutMapping("/customer/{id}")
	   public ResponseEntity<CarVantageCustomerEntity> updateCustomer(
	           @PathVariable Long id,
	           @RequestBody CarVantageCustomerEntity en) {

	       CarVantageCustomerEntity updated = service.update(id, en);
	       return ResponseEntity.ok(updated);
	   }

	   
}
