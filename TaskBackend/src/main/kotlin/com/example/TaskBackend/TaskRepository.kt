package com.example.TaskBackend

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import org.springframework.data.repository.query.Param

@Repository
interface TaskRepository : JpaRepository<Task, Long> {

    @Modifying
    @Transactional
    // JPQL Query: Uses "Task" (Class Name) and "t.completed" (Field Name)
    @Query("UPDATE Task t SET t.completed = :status WHERE t.id = :id")
    fun markTaskAsComplete(@Param("id") id: Long, @Param("status") status: Boolean)
}