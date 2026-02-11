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
import com.carvantage.entity.CarVantageMechanicEntity;
import com.carvantage.services.CarVantageMechanicService;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarVantageMechanicController {
	   @Autowired
	   private CarVantageMechanicService service;
	   @PostMapping("/mechanic")
	   public ResponseEntity add(@RequestBody CarVantageMechanicEntity en) {
		   service.add(en);
		   return ResponseEntity
	               .status(HttpStatus.CREATED)
	               .body("mechanic added successfully");
		   
	   }
	   @GetMapping("/mechanic")
	   public ResponseEntity<List<CarVantageMechanicEntity>> get(){
		  List<CarVantageMechanicEntity> ls =service.getAll();
		  return ResponseEntity.ok(ls);
	   }  
	   @DeleteMapping("/mechanic/{id}")
	   public ResponseEntity<String> deleteMechanic(@PathVariable Long id) {
	       service.deleteById(id);
	       return ResponseEntity.ok("Mechanic deleted successfully");
	   }
	   @PutMapping("/mechanic/{id}")
	   public ResponseEntity<CarVantageMechanicEntity> updateMechanic(
	           @PathVariable Long id,
	           @RequestBody CarVantageMechanicEntity en) {

	       CarVantageMechanicEntity updated = service.update(id, en);
	       return ResponseEntity.ok(updated);
	   }

	   
}
