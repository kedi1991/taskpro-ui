import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskView from './TaskView';
import { Card } from "react-bootstrap";


function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/tasks?filter=${filter}`);
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Tasks list</h1>
      <input
        type="text"
        placeholder="Search..."
        value={filter} 
        onChange={handleFilterChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <>
              <Card>
          
                  <Card.Body>
                      <Card.Title className="text-center">{task.task_name}</Card.Title>
                      <Card.Text>{task.description}</Card.Text>
                      Owner: {task.owner}<br></br>
                      Date created: {task.created_at}<br></br>
                      Status: {task.status}<br></br>
                      
                  </Card.Body>
              </Card>
            </>
            // <li key={item.id}>{item.task_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksPage;
