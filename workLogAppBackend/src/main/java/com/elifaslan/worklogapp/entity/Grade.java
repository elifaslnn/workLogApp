package com.elifaslan.worklogapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long Id;
    private String gradeName;


    public Grade(){

    }

    public Grade(String gradeName){
        this.gradeName=gradeName;
    }

    //GETTER AND SETTER

    public Long getId() {
        return Id;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }
}
