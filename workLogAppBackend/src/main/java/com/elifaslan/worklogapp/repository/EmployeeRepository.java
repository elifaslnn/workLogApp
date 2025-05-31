// src/main/java/com/elifaslan/worklogapp/repository/EmployeeRepository.java
package com.elifaslan.worklogapp.repository;

import com.elifaslan.worklogapp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByTeamLead(String teamLeadFullName);

    List<Employee> findByDirector(String directorFullName);

    List<Employee> findByGrade(String grade);
}