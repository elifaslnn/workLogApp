package com.elifaslan.worklogapp.service;

//iş mantığı burada yazılıyor
//repositoryleri kullanarak veritabanı ile etkileşime girer ve controller'lare veri sağlar
import com.elifaslan.worklogapp.entity.Employee;
import com.elifaslan.worklogapp.repository.EmployeeRepository;
import com.elifaslan.worklogapp.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final GradeRepository gradeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, GradeRepository gradeRepository){
        this.employeeRepository=employeeRepository;
        this.gradeRepository=gradeRepository;
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
    public List<Employee> getEmployeeByGrade(String grade) {
        return employeeRepository.findByGrade(grade);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee not found with id: " + id + " for deletion.");
        }
        employeeRepository.deleteById(id);
    }

}