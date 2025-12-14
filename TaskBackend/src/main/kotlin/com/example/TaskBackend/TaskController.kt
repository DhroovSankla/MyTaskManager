package com.example.TaskBackend
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = ["http://localhost:5173"])
class TaskController(private val repository: TaskRepository) {

    // 1. Get All Tasks (One-line function!)
    @GetMapping
    fun getAllTasks(): List<Task> = repository.findAll()

    // 2. Create a Task
    @PostMapping
    fun createTask(@RequestBody task: Task): Task = repository.save(task)

    // 3. Get Task by ID
    @GetMapping("/{id}")
    fun getTaskById(@PathVariable id: Long): ResponseEntity<Task> {
        return repository.findById(id)
            .map { task -> ResponseEntity.ok(task) }
            .orElse(ResponseEntity.notFound().build())
    }
    @PutMapping("/{id}")
    fun updateTask(@PathVariable id: Long, @RequestBody updatedTask: Task): Task {
        println("FORCE UPDATING ID: $id TO STATUS: ${updatedTask.completed}")

        // 1. Run the Direct SQL Update (The Hammer)
        repository.markTaskAsComplete(id, updatedTask.completed)

        // 2. Since we bypassed the standard save, we manually return the updated object
        // so React can update the screen immediately.
        return updatedTask
    }
    // 5. Delete Task
    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long): ResponseEntity<Void> {
        return if (repository.existsById(id)) {
            repository.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}