package com.carvantage.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CarVantageRegisterEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String fullname;
  private String email;
  private String username;
  private String mobileNumber;
  private String password;
  @Transient
  private String confirmPass;
}
