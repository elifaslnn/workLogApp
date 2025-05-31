package com.elifaslan.worklogapp.controller;

import  com.elifaslan.worklogapp.entity.WorklogType;
import  com.elifaslan.worklogapp.service.WorklogTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/worklogTypes")
@CrossOrigin(origins = "*")
public class WorklogTypeController {
    private final WorklogTypeService worklogTypeService;

    @Autowired
    public WorklogTypeController(WorklogTypeService worklogTypeService) {
        this.worklogTypeService = worklogTypeService;
    }

    @GetMapping
    public ResponseEntity<List<WorklogType>> getAllWorklogTypes() {
        List<WorklogType> worklogTypes = worklogTypeService.getAllWorklogTypes();
        return ResponseEntity.ok(worklogTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorklogType> getWorklogTypeById(@PathVariable Long id) {
        Optional<WorklogType> worklogType = worklogTypeService.getWorklogTypeById(id);
        return worklogType.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorklogType> createWorklogType(@RequestBody WorklogType worklogType) {
        WorklogType createdWorklogType = worklogTypeService.createWorklogType(worklogType);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorklogType);
    }

}
