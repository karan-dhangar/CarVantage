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

import com.carvantage.entity.CarVantageAppointmentEntity;
import com.carvantage.services.CarVantageAppointmentService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarVantageAppointmentController {
	   @Autowired
	   private CarVantageAppointmentService service;
	   @PostMapping("/appointment")
	   public ResponseEntity add(@RequestBody CarVantageAppointmentEntity en) {
		   service.add(en);
		   return ResponseEntity
	               .status(HttpStatus.CREATED)
	               .body("Appointment added successfully");
		   
	   }
	   @GetMapping("/appointment")
	   public ResponseEntity<List<CarVantageAppointmentEntity>> get(){
		  List<CarVantageAppointmentEntity> ls =service.getAll();
		  return ResponseEntity.ok(ls);
	   }  
	   @DeleteMapping("/appointment/{id}")
	   public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
	       service.deleteById(id);
	       return ResponseEntity.ok("Appointment deleted successfully");
	   }
	   @PutMapping("/appointment/{id}")
	   public ResponseEntity<CarVantageAppointmentEntity> updateAppointment(
	           @PathVariable Long id,
	           @RequestBody CarVantageAppointmentEntity en) {

	       CarVantageAppointmentEntity updated = service.update(id, en);
	       return ResponseEntity.ok(updated);
	   }

}
