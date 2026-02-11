package com.carvantage.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarVantageDashboard {
	private Long totalAppointments;
    private Long pendingRepairs;
    private Long completedRepairs;
    private Long availableMechanics;

    private List<?> upcomingAppointments;
    private List<?> recentServices;
}
