package com.elifaslan.worklogapp.controller;

import  com.elifaslan.worklogapp.entity.Grade;
import  com.elifaslan.worklogapp.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "*")

public class GradeController {
    private final GradeService gradeService;


    @Autowired
    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping
    public ResponseEntity<List<Grade>> getAllGrades() {
        List<Grade> grades = gradeService.getAllGrades();
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Long id) {
        Optional<Grade> grade = gradeService.getGradeById(id);
        return grade.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Grade> createGrade(@RequestBody Grade grade) {
        try {
            Grade createdGrade = gradeService.createGreate(grade);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdGrade);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable Long id, @RequestBody Grade gradeDetails) {
        try {
            Grade updatedGrade = gradeService.updateGreate(id, gradeDetails);
            return ResponseEntity.ok(updatedGrade);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
