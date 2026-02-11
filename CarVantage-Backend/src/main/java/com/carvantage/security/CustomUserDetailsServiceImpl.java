package com.carvantage.security;

import com.carvantage.entity.CarVantageRegisterEntity;
import com.carvantage.repo.CarVanatageRegisterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final CarVanatageRegisterRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {

        CarVantageRegisterEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new UserPrincipal(
                user.getId().toString(),
                user.getEmail(),
                user.getPassword()
        );
    }
}
