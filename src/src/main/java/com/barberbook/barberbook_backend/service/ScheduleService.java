package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.model.Barber;
import com.barberbook.barberbook_backend.model.Schedule;
import com.barberbook.barberbook_backend.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private BarberService barberService;

    public List<Schedule> getAllSchedule() {
        return scheduleRepository.findAll();
    }

    public List<Schedule> getScheduleByBarbershopId(Integer barbershopId) {
        List<Integer> barberIds = barberService.getBarbersByBarbershopId(barbershopId)
                .stream()
                .map(Barber::getId)
                .collect(Collectors.toList());

        return scheduleRepository.findByBarberIdIn(barberIds);
    }

    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    public List<Schedule> getScheduleByBarberId(Integer barberId) {
        return scheduleRepository.findByBarberId(barberId);
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Long id, Schedule schedule) {
        Optional<Schedule> existingSchedule = scheduleRepository.findById(id);
        if (existingSchedule.isPresent()) {
            Schedule s = existingSchedule.get();
            s.setAvailable(schedule.getAvailable());
            return scheduleRepository.save(s);
        }
        return null;
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    public double calcularPorcentagemOcupado(Integer barbershopId) {
        List<Integer> barberIds = barberService.getBarbersByBarbershopId(barbershopId)
                .stream()
                .map(Barber::getId)
                .collect(Collectors.toList());

        if (barberIds.isEmpty()) {
            return 0.0; 
        }

        long totalSlots = scheduleRepository.countByBarberIdInAndAvailable(barberIds, true) +
                          scheduleRepository.countByBarberIdInAndAvailable(barberIds, false);
        long occupiedSlots = scheduleRepository.countByBarberIdInAndAvailable(barberIds, false);

        return totalSlots == 0 ? 0.0 : (double) occupiedSlots / totalSlots * 100;
    }
    
}