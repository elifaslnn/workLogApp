package com.elifaslan.worklogapp.repository;

import com.elifaslan.worklogapp.entity.WorklogType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorklogTypeRepository extends JpaRepository<WorklogType, Long> {
}
