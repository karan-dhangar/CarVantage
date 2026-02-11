package com.carvantage.entity;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CarVantageAppointmentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String customerName;
  private String carModel;
  private String appointmentStatus;
  @JsonFormat(pattern = "dd-MM-yyyy")
  private LocalDate appointmentDate;
}
