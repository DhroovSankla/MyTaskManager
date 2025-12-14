import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); 

  // 1. Define the Fetch Function separately
  const fetchTasks = () => {
    fetch('http://localhost:8080/tasks')
      .then(res => res.json())
      .then(data => {
        console.log("Fresh Data from DB:", data); // Check console to see the truth
        setTasks(data);
      })
      .catch(err => console.error("Error fetching tasks:", err));
  };

  // 2. Call it when the app loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // 3. Add Task
  const addTask = () => {
    if (!newTask) return;
    axios.post('http://localhost:8080/tasks', { description: newTask, completed: false })
      .then(() => {
        setNewTask("");
        fetchTasks(); // <--- RELOAD THE LIST
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // 4. Delete Task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => {
        fetchTasks(); // <--- RELOAD THE LIST
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  // 5. Update Task
  const toggleTask = (id, currentDescription, currentStatus) => {
    axios.put(`http://localhost:8080/tasks/${id}`, { 
        description: currentDescription, 
        completed: !currentStatus 
      })
      .then(() => {
        console.log("Update success! Reloading list...");
        fetchTasks(); // <--- RELOAD THE LIST FROM DB
      })
      .catch(error => console.error("Error updating task:", error));
  };

  return (
    <div className="index">
      <h1>My Task Manager</h1>

      <div className="add-task-container" style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="What needs to be done?"
          style={{ padding: '10px', width: '200px', marginRight: '10px' }}
        />
        <button onClick={addTask} style={{ padding: '10px 20px' }}>Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ listStyle: 'none', margin: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            
            <span 
              onClick={() => toggleTask(task.id, task.description, task.completed)}
              style={{ 
                textDecoration: task.completed ? 'line-through' : 'none', 
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              {task.description} {task.completed ? "✅" : "⏳"}
            </span>
            
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px', borderRadius: '5px' }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;