package com.carvantage.serviceImplts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.carvantage.entity.CarVantageRegisterEntity;
import com.carvantage.repo.CarVanatageRegisterRepo;
import com.carvantage.services.CarVantageRegisterService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CarVantageRegisterServiceImplts implements CarVantageRegisterService {

    private final CarVanatageRegisterRepo repo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void add(CarVantageRegisterEntity en) {
        en.setPassword(passwordEncoder.encode(en.getPassword()));
        repo.save(en);
    }
}
