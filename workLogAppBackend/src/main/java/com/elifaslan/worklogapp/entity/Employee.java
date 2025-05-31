// src/main/java/com/elifaslan/worklogapp/entity/Employee.java
package com.elifaslan.worklogapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String grade;
    private String teamLead;
    private String director;
    private LocalDate startDate;
    private LocalDate endDate;

    // Constructors
    public Employee() {}

    public Employee(String firstName, String lastName, String grade, String teamLead, String director, LocalDate startDate, LocalDate endDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.teamLead = teamLead;
        this.director = director;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getTeamLead() {
        return teamLead;
    }

    public void setTeamLead(String teamLead) {
        this.teamLead = teamLead;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    // Full name getter
    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }
}