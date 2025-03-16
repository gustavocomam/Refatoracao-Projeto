package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.repository.ScheduleRepository;
import com.barberbook.barberbook_backend.model.Schedule;
import java.util.List;

public class ScheduleService {

    private static ScheduleService INSTANCE;
    private final ScheduleRepository scheduleRepository;

    private ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public static synchronized ScheduleService getInstance(ScheduleRepository repository) {
        if (INSTANCE == null) {
            INSTANCE = new ScheduleService(repository);
        }
        return INSTANCE;
    }

    public List<Schedule> getAllSchedule() {
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
}
