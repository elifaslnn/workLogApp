// src/main/java/com/elifaslan/worklogapp/service/WorkLogService.java
package com.elifaslan.worklogapp.service;

import com.elifaslan.worklogapp.entity.Employee;
import com.elifaslan.worklogapp.entity.WorkLog;
import com.elifaslan.worklogapp.repository.EmployeeRepository; // EmployeeRepository'yi import et
import com.elifaslan.worklogapp.repository.WorkLogRepository;
import com.elifaslan.worklogapp.repository.WorklogTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@Service
public class WorkLogService {
    private final WorkLogRepository workLogRepository;
    private final WorklogTypeRepository worklogTypeRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public WorkLogService(WorkLogRepository workLogRepository,
                          WorklogTypeRepository worklogTypeRepository,
                          EmployeeRepository employeeRepository){
        this.workLogRepository = workLogRepository;
        this.worklogTypeRepository = worklogTypeRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<WorkLog> getAllWorkLogs(){
        return workLogRepository.findAll();
    }

    public Optional<WorkLog> getWorklogById(Long id){
        return workLogRepository.findById(id);
    }

    public List<WorkLog> getWorkLogsByMonthAndWorklogType(String monthDate, String worklogTypeName) {
        return workLogRepository.findByMonthDateAndWorklogTypeName(monthDate, worklogTypeName);
    }

    public double getTotalEffortByMonthAndWorklogType(String monthDate, String worklogTypeName) {
        List<WorkLog> worklogs = workLogRepository.findByMonthDateAndWorklogTypeName(monthDate, worklogTypeName);
        return worklogs.stream().mapToDouble(WorkLog::getEffort).sum();
    }

    public Map<String, Double> getTotalEffortByTeamLead(String monthDate) {
        Map<String, Double> teamLeadEfforts = new HashMap<>();


        List<Employee> teamLeads = employeeRepository.findByGrade("Team Lead");

        for (Employee teamLead : teamLeads) {
            String teamLeadFullName = teamLead.getFullName();


            List<WorkLog> teamLeadOwnLogs = workLogRepository.findByMonthDateAndEngineerIn(monthDate, List.of(teamLeadFullName));
            double ownEffort = teamLeadOwnLogs.stream().mapToDouble(WorkLog::getEffort).sum();
            teamLeadEfforts.put(teamLeadFullName + " (Kendi Eforu)", ownEffort);

            List<Employee> teamMembers = employeeRepository.findByTeamLead(teamLeadFullName);
            List<String> teamMemberNames = teamMembers.stream()
                    .map(Employee::getFullName)
                    .collect(Collectors.toList());


            List<WorkLog> teamMemberLogs = workLogRepository.findByMonthDateAndEngineerIn(monthDate, teamMemberNames);


            double totalTeamMemberEffort = teamMemberLogs.stream().mapToDouble(WorkLog::getEffort).sum();
            teamLeadEfforts.put(teamLeadFullName + " (Çalışan Toplam Eforu)", totalTeamMemberEffort);
        }
        return teamLeadEfforts;
    }


    public Map<String, Double> getTotalEffortByDirector(String monthDate) {
        Map<String, Double> directorEfforts = new HashMap<>();


        List<Employee> directors = employeeRepository.findByGrade("Director");

        for (Employee director : directors) {
            String directorFullName = director.getFullName(); // Direktörün tam adı


            List<WorkLog> directorOwnLogs = workLogRepository.findByMonthDateAndEngineerIn(monthDate, List.of(directorFullName));
            double ownEffort = directorOwnLogs.stream().mapToDouble(WorkLog::getEffort).sum();
            directorEfforts.put(directorFullName + " (Kendi Eforu)", ownEffort);


            List<Employee> directReports = employeeRepository.findByDirector(directorFullName);
            List<String> directReportNames = directReports.stream()
                    .map(Employee::getFullName)
                    .collect(Collectors.toList());


            List<Employee> teamLeadsUnderDirector = employeeRepository.findByDirector(directorFullName).stream()
                    .filter(emp -> "Team Lead".equals(emp.getGrade()))
                    .collect(Collectors.toList());

            for (Employee tl : teamLeadsUnderDirector) {
                List<Employee> membersUnderTl = employeeRepository.findByTeamLead(tl.getFullName());
                membersUnderTl.forEach(member -> directReportNames.add(member.getFullName()));
            }


            List<String> allReportsUnderDirector = directReportNames.stream().distinct().collect(Collectors.toList());


            List<WorkLog> allReportsLogs = workLogRepository.findByMonthDateAndEngineerIn(monthDate, allReportsUnderDirector);

            double totalReportsEffort = allReportsLogs.stream().mapToDouble(WorkLog::getEffort).sum();
            directorEfforts.put(directorFullName + " (Çalışan Toplam Eforu)", totalReportsEffort);
        }
        return directorEfforts;
    }


    //CREATE WORKLOG
    public WorkLog createWorklog (WorkLog workLog){
        return workLogRepository.save(workLog);
    }

    public void deleteWorklog() {
        workLogRepository.deleteAll();
    }
}