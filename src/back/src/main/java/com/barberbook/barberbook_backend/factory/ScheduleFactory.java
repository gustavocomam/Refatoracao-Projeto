package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Schedule;

public class ScheduleFactory {

    public static Schedule createSchedule(Integer barberId, String scheduleDay, String scheduleTime, Boolean available) {
        return new Schedule(barberId, scheduleDay, scheduleTime, available);
    }
}
