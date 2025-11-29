package com.example.TaskBackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow React to talk to us later
public class TaskController {

    @Autowired
    private TaskRepository repository;

    // 1. GET /tasks -> Returns all tasks from Database
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    // 2. POST /tasks -> Saves a new task to Database
    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task) {
        return repository.save(task);
    }
    // 3. PUT /tasks/{id} -> Updates an existing task
    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        // 1. Find the task in the DB
        Task existingTask = repository.findById(id).orElse(null);

        // 2. Update the "isDone" status
        if (existingTask != null) {
            existingTask.setDone(updatedTask.isDone()); // Change true/false
            return repository.save(existingTask); // Save back to DB
        }
        return null;
    }
    // 4. DELETE /tasks/{id} -> Deletes a task
    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
