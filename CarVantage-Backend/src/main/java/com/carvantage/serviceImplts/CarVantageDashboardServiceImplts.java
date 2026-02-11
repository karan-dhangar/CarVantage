package com.carvantage.serviceImplts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carvantage.entity.CarVantageDashboard;
import com.carvantage.repo.CarVantageAppointmentRepo;
import com.carvantage.repo.CarVantageMechanicRepo;
import com.carvantage.repo.CarVantageServicesRepo;
import com.carvantage.services.CarVantageDashboardService;

@Service
public class CarVantageDashboardServiceImplts implements CarVantageDashboardService {
	@Autowired
    private CarVantageAppointmentRepo appointmentRepo;

    @Autowired
    private CarVantageMechanicRepo mechanicRepo;

    @Autowired
    private CarVantageServicesRepo serviceRepo;

    @Override
    public CarVantageDashboard getDashboardData() {

    	CarVantageDashboard res = new CarVantageDashboard();

        Long totalAppointments = appointmentRepo.count();
        Long pending = appointmentRepo.countByAppointmentStatus("Pending");
        Long completed = appointmentRepo.countByAppointmentStatus("Completed");
        Long availableMech = mechanicRepo.countByIsAvailableTrue();

        res.setTotalAppointments(totalAppointments);
        res.setPendingRepairs(pending);
        res.setCompletedRepairs(completed);
        res.setAvailableMechanics(availableMech);

        res.setUpcomingAppointments(
                appointmentRepo.findTop5ByOrderByAppointmentDateAsc()
        );

        res.setRecentServices(
                serviceRepo.findTop5ByOrderByServiceDateDesc()
        );

        return res;

    }
}
