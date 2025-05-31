// src/main/java/com/elifaslan/worklogapp/repository/WorkLogRepository.java
package com.elifaslan.worklogapp.repository;

import com.elifaslan.worklogapp.entity.WorkLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {
    List<WorkLog> findByMonthDateAndWorklogTypeName(String monthDate, String worklogTypeName);
    List<WorkLog> findByMonthDate(String monthDate);

    List<WorkLog> findByMonthDateAndEngineerIn(String monthDate, List<String> engineers);
}