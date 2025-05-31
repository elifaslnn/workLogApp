// src/main/java/com/elifaslan/worklogapp/controller/WorkLogController.java
package com.elifaslan.worklogapp.controller;

import com.elifaslan.worklogapp.entity.WorkLog;
import com.elifaslan.worklogapp.service.WorkLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/worklogs")
@CrossOrigin(origins = "*")
public class WorkLogController {
    private final WorkLogService worklogService;

    @Autowired
    public WorkLogController(WorkLogService worklogService) {
        this.worklogService = worklogService;
    }

    @GetMapping
    public ResponseEntity<List<WorkLog>> getAllWorklogs(
            @RequestParam(required = false) Long calisanId,
            @RequestParam(required = false) String monthDate) {
        List<WorkLog> worklogs;
        worklogs = worklogService.getAllWorkLogs();
        return ResponseEntity.ok(worklogs);
    }

    @GetMapping("/by-month-and-type")
    public ResponseEntity<List<WorkLog>> getWorklogsByMonthAndType(
            @RequestParam String monthDate,
            @RequestParam String worklogType) {
        List<WorkLog> worklogs = worklogService.getWorkLogsByMonthAndWorklogType(monthDate, worklogType);
        if (worklogs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(worklogs);
    }

    @GetMapping("/total-effort")
    public ResponseEntity<Double> getTotalEffort(
            @RequestParam String monthDate,
            @RequestParam String worklogType) {
        double totalEffort = worklogService.getTotalEffortByMonthAndWorklogType(monthDate, worklogType);
        return ResponseEntity.ok(totalEffort);
    }

    // Yeni endpoint: Ay bazında team lead efor özetlerini getirme
    @GetMapping("/team-lead-effort-summary")
    public ResponseEntity<Map<String, Double>> getTeamLeadEffortSummary(@RequestParam String monthDate) {
        Map<String, Double> summary = worklogService.getTotalEffortByTeamLead(monthDate);
        return ResponseEntity.ok(summary);
    }

    // Yeni endpoint: Ay bazında direktör efor özetlerini getirme
    @GetMapping("/director-effort-summary")
    public ResponseEntity<Map<String, Double>> getDirectorEffortSummary(@RequestParam String monthDate) {
        Map<String, Double> summary = worklogService.getTotalEffortByDirector(monthDate);
        return ResponseEntity.ok(summary);
    }


    @GetMapping("/{id}")
    public ResponseEntity<WorkLog> getWorklogById(@PathVariable Long id) {
        Optional<WorkLog> worklog = worklogService.getWorklogById(id);
        return worklog.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkLog> createWorklog(@RequestBody WorkLog worklog) {
        try {
            WorkLog createdWorklog = worklogService.createWorklog(worklog);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdWorklog);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllWorklogs() {
        try {
            worklogService.deleteWorklog();
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}