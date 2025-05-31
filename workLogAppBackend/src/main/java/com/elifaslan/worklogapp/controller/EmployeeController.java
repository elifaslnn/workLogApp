package com.elifaslan.worklogapp.controller;

import  com.elifaslan.worklogapp.entity.Employee;
import  com.elifaslan.worklogapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Employees")
@CrossOrigin(origins = "*")
public class EmployeeController {
    private final EmployeeService EmployeeService;

    @Autowired
    public EmployeeController(EmployeeService EmployeeService) {
        this.EmployeeService = EmployeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> Employees = EmployeeService.getAllEmployees();
        return ResponseEntity.ok(Employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> Employee = EmployeeService.getEmployeeById(id);
        return Employee.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee Employee) {
        try {
            Employee createdEmployee = EmployeeService.createEmployee(Employee);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/grade/{grade}")
    public ResponseEntity<List<Employee>> getEmployeesByGrade(@PathVariable String grade) {
        List<Employee> employees = EmployeeService.getEmployeeByGrade(grade);
        return ResponseEntity.ok(employees);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        try {
            EmployeeService.deleteEmployee(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) { // Diğer beklenmedik hatalar için
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
