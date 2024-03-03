import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Card, Form, Modal } from "react-bootstrap";


function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProject, setEditedProject] = useState({
    id: '',
    project_name: '',
    owner: '',
    updated_at: '',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`/projects?filter=${filter}`);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteClick = async (projectId) => {
    try {
      await axios.delete(`/projects/${projectId}`);
      alert("Project successfully deleted")
      // Refresh the page after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert("You cannot delete another user's project")

    }
  };

  //Edit functionality
  const handleEditClick = (task) => {
    setEditedProject(projects);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProject(prevProject => ({
      ...prevProject,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/projects/${editedProject.id}/`, editedProject);
      setShowEditModal(false);
      // Refresh the page and alert
      alert("Project successfully updated")
      // Refresh the page after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error editing project:', error);
      alert("You may not have rights to edit this project")

    }
  };

  return (
    <div>
      <h1>Projects list</h1>
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
          {projects.map((project) => (
            <>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">{project.project_name}</Card.Title>
                  Owner: {project.owner}<br></br>
                  Date created: {project.created_at}<br></br>
                </Card.Body>
                <Button onClick={() => handleEditClick(project)}>Edit</Button>
                <br></br>
                <Button variant="danger" onClick={() => handleDeleteClick(project.id)}>Delete</Button>
      
              </Card>
            </>
          ))}
        </ul>
      )}

      {/* Use an model object for the edit function */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" name="project_name" value={editedProject.project_name} onChange={handleInputChange} />
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

export default ProjectsPage;
