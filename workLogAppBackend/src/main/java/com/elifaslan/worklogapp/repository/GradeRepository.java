package com.elifaslan.worklogapp.repository;

import com.elifaslan.worklogapp.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {

}