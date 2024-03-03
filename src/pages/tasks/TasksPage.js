import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskView from './TaskView';
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: '',
    task_name: '',
    description: '',
    owner: '',
    created_at: '',
    status: ''
  });

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

  const handleDeleteClick = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      alert("Task successfully deleted")
      // Refresh the page after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert("You cannot delete another user's tasks")

    }
  };

  //Edit functionality
  const handleEditClick = (task) => {
    setEditedTask(task);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/tasks/${editedTask.id}`, editedTask);
      setShowEditModal(false);
      // Refresh the page and alert
      alert("Task successfully updated")
      // Refresh the page after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error editing task:', error);
      alert("You may not have rights to edit this task")

    }
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
                <Button onClick={() => handleDeleteClick(task.id)}>Delete</Button>
                <br></br>
                <Button onClick={() => handleEditClick(task)}>Edit</Button>


              </Card>
            </>
          ))}
        </ul>
      )}

      {/* Use an model object for the edit function */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" name="task_name" value={editedTask.task_name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={editedTask.description} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSubmit}>Confirm</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default TasksPage;
