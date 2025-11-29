import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load Tasks
  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add Task
  const addTask = () => {
    if (!newTask.trim()) return;
    const taskObj = { description: newTask, done: false };

    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskObj)
    })
    .then(res => res.json())
    .then(saved => {
      setTasks([...tasks, saved]);
      setNewTask("");
    });
  };

  // Update Task (Toggle Done)
  const toggleTask = (id, currentStatus) => {
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !currentStatus })
    })
    .then(res => res.json())
    .then(updated => {
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    });
  };

  // NEW: Delete Task
  const deleteTask = (id, e) => {
    e.stopPropagation(); // Stop the click from toggling the task color

    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Remove it from the list on screen
      setTasks(tasks.filter(t => t.id !== id));
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '500px' }}>
      <h1>My Task Manager</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="New Task..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: '10px', flexGrow: 1 }}
        />
        <button onClick={addTask} style={{ padding: '10px' }}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li 
            key={task.id} 
            onClick={() => toggleTask(task.id, task.done)}
            style={{ 
              marginBottom: '10px', 
              padding: '10px', 
              background: task.done ? '#d4edda' : '#f8d7da', 
              color: 'black', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between', // Push delete button to right
              borderRadius: '5px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <span style={{ marginRight: '10px' }}>
                 {task.done ? "✅" : "⬜"} 
               </span>
               <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                 {task.description}
               </span>
            </div>

            {/* NEW: The Delete Button */}
            <button 
              onClick={(e) => deleteTask(task.id, e)}
              style={{
                background: '#ff4d4d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
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