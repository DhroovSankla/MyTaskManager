package com.example.TaskBackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task) {
        return repository.save(task);
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task existingTask = repository.findById(id).orElse(null);
        if (existingTask != null) {
            // Note: Kotlin generates 'getDone' for the 'done' field automatically
            // But sometimes for boolean it uses 'isDone' or 'getDone'.
            // If 'getDone()' turns red, try 'isDone()'.
            existingTask.setDone(updatedTask.getDone());
            return repository.save(existingTask);
        }
        return null;
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
