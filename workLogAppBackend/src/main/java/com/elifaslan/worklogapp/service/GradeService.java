package com.elifaslan.worklogapp.service;

import com.elifaslan.worklogapp.entity.Grade;
import com.elifaslan.worklogapp.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeService {

    private final GradeRepository gradeRepository;

    @Autowired
    public GradeService(GradeRepository gradeRepository){
        this.gradeRepository=gradeRepository;
    }

    public List<Grade> getAllGrades(){
        return gradeRepository.findAll();
    }

    public Optional<Grade> getGradeById(Long id){
        return gradeRepository.findById(id);
    }

    public Grade createGreate(Grade grade){

        return gradeRepository.save(grade);
    }

    public Grade updateGreate(Long id, Grade gradeDetails){
        Grade grade=gradeRepository.findById(id).orElseThrow(()-> new RuntimeException("Grade not found with id " + id));

        grade.setGradeName(gradeDetails.getGradeName());
        return gradeRepository.save(grade);
    }



}
