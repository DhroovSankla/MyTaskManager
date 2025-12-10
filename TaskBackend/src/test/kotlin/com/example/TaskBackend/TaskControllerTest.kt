package com.example.TaskBackend

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `should create and retrieve tasks`() {
        // 1. Create a Task (POST)
        val taskJson = """
            {
                "title": "Exam Study",
                "description": "Finish Unit 1",
                "isCompleted": false
            }
        """.trimIndent()

        mockMvc.perform(post("/tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(taskJson))
            .andExpect(status().isOk)

        // 2. Get All Tasks (GET)
        mockMvc.perform(get("/tasks"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].title").value("Exam Study")) // Checks if title matches

        println("✅ API TEST PASSED: Task Created and Retrieved!")
    }
}