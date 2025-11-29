package com.example.TaskBackend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private boolean done; // Standardized name

    public Task() {}

    public Task(String description, boolean done) {
        this.description = description;
        this.done = done;
    }

    // Getters - THIS IS WHAT REACT NEEDS
    public Long getId() { return id; }
    public String getDescription() { return description; }
    public boolean isDone() { return done; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setDescription(String description) { this.description = description; }
    public void setDone(boolean done) { this.done = done; }
}