package com.carvantage.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carvantage.entity.CarVantageRegisterEntity;
import com.carvantage.services.CarVantageRegisterService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarVantageRegisterController {
   @Autowired
   private CarVantageRegisterService service;
   @PostMapping("/register")
   public ResponseEntity add(@RequestBody CarVantageRegisterEntity en) {
	   
	   if (!en.getPassword().equals(en.getConfirmPass())) {
           return ResponseEntity
                   .status(HttpStatus.BAD_REQUEST)
                   .body("Password and Confirm Password do not match");
       }

       service.add(en);

       return ResponseEntity
               .status(HttpStatus.CREATED)
               .body("User registered successfully");
	   
	   
   }
}