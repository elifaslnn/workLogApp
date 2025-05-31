// src/main/java/com/elifaslan/worklogapp/entity/WorkLog.java
package com.elifaslan.worklogapp.entity;

import jakarta.persistence.*;

@Entity
public class WorkLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String engineer;
    private String monthDate; // "YYYY-MM"
    @ManyToOne
    @JoinColumn(name = "worklog_type_id")
    private WorklogType worklogType;
    private double effort;

    // Constructors
    public WorkLog() {}

    public WorkLog(String engineer, String monthDate, WorklogType worklogType, double effort) {
        this.engineer = engineer;
        this.monthDate = monthDate;
        this.worklogType = worklogType;
        this.effort = effort;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEngineer() {
        return engineer;
    }

    public void setEngineer(String engineer) {
        this.engineer = engineer;
    }

    public String getMonthDate() {
        return monthDate;
    }

    public void setMonthDate(String monthDate) {
        this.monthDate = monthDate;
    }

    public WorklogType getWorklogType() {
        return worklogType;
    }

    public void setWorklogType(WorklogType worklogType) {
        this.worklogType = worklogType;
    }

    public double getEffort() {
        return effort;
    }

    public void setEffort(double effort) {
        this.effort = effort;
    }
}