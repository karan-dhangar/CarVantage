package com.carvantage.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CarVantageInvoiceEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
	    private String customerName;
	    private String serviceName;

	    
	    private Double amount;

	    @JsonFormat(pattern = "dd-MM-yyyy")
	    private LocalDate invoiceDate;

	    // PAID / UNPAID
	    private String paymentStatus;
 
}