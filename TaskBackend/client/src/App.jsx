import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); 

  // 1. Fetch Tasks
  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  // 2. Add Task Function
  const addTask = () => {
    if (!newTask) return;
    axios.post('http://localhost:8080/tasks', { description: newTask, completed: false })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // 3. DELETE Task Function (NEW)
  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => {
        // Remove the task from the screen immediately
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div className="App">
      <h1>My Task Manager</h1>

      {/* Input Box */}
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

      {/* The List with DELETE Button */}
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ listStyle: 'none', margin: '10px 0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <span>{task.description} {task.completed ? "✅" : "⏳"}</span>
            
            {/* The Red X Button */}
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