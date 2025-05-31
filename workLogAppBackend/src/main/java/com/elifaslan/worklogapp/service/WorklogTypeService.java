package com.elifaslan.worklogapp.service;


import com.elifaslan.worklogapp.entity.WorklogType;
import com.elifaslan.worklogapp.repository.WorklogTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorklogTypeService {
    private final WorklogTypeRepository worklogTypeRepository;

    @Autowired
    public WorklogTypeService(WorklogTypeRepository worklogTypeRepository) {
        this.worklogTypeRepository = worklogTypeRepository;
    }

    public List<WorklogType> getAllWorklogTypes() {
        return worklogTypeRepository.findAll();
    }

    public Optional<WorklogType> getWorklogTypeById(Long id) {
        return worklogTypeRepository.findById(id);
    }

    public WorklogType createWorklogType(WorklogType worklogType) {
        return worklogTypeRepository.save(worklogType);
    }

}
