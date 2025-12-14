package com.example.TaskBackend

import jakarta.persistence.*

@Entity
@Table(name = "final_tasks") // 1. New Table Name (Fresh Start)
data class Task(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var description: String = "",

    @Column(name = "completed") // 2. FORCE column name to be "completed"
    var completed: Boolean = false
)