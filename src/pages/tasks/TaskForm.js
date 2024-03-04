import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import useRegisteredUsers from "../../hooks/useRegisteredUsers";

import styles from "../../styles/TaskForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useProjects from "../../hooks/useProjects";
import { Image } from "react-bootstrap";

function TaskForm() {

    const [errors, setErrors] = useState({});
    const history = useHistory();

    // Use the custom hook to get the selected value
    const { data, loading } = useRegisteredUsers();

    const { projects } = useProjects()
    const [selectedProject, setSelectedProject] = useState("")

    const [selectedUser, setSelectedUser] = useState(''); // State to hold the selected user ID

    // Event handler to handle select change
    const handleSelectChange = (event) => {
        setSelectedUser(event.target.value); // Update the selected user ID in state
    };

    const [selectedStatus, setSelectedStatus] = useState(''); // State to hold the selected user ID

    // Event handler to handle select change
    const handleSelectStatus = (event) => {
        setSelectedStatus(event.target.value); // Update the selected user ID in state
    };

    // Event handler to handle select change
    const handleProjectSelectChange = (event) => {
        setSelectedProject(event.target.value); // Update the selected user ID in state
    };


    const [taskData, setTaskData] = useState({
        task_name: "",
        description: "",
        assignees: "",
        project: "",
        status: "",
        attachment: "",
    });
    const { task_name, description, assignees, project, status, attachment } = taskData;

    const handleChange = (event) => {
        setTaskData({
            ...taskData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("task_name", task_name);
        formData.append("description", description);
        formData.append("assignees", selectedUser);
        formData.append("project", selectedProject);
        formData.append("description", description);
        formData.append("status", selectedStatus);

        try {

            const { data } = await axios.post("/tasks/", formData);
            alert("New task successfully created")
            history.push(`/tasks/`);

        } catch (err) {
            console.log(err);
            alert("An error occurred: " + JSON.stringify(err.response?.data));

            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const otherFields = (
        <div className="text-center">

            <Form.Group controlId="task_name">
                <Form.Label>Task name</Form.Label>
                <Form.Control type="text" name="task_name" value={task_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="assignees">
                <Form.Label>Assignees</Form.Label>
                <Form.Control as="select" value={selectedUser} name="assignees" onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select...</option>
                    {data.map(user => (
                        <option key={user.id} value={user.id}>{user.owner}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Control as="select" value={selectedProject} name="project" onChange={(e) => setSelectedProject(e.target.value)}>
                    <option value="">Select...</option>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.project_name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={selectedStatus} name="status" onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option key={project.id} value='0'>Pending</option>
                    <option key={project.id} value='1'>Executing</option>
                    <option key={project.id} value='2'>Completed</option>
                    <option key={project.id} value='3'>Blocked</option>
                </Form.Control>
            </Form.Group>
            <br></br>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => { }}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Col
                        md={6}
                        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
                    >
                        <Image
                            className={`${appStyles.FillerImage}`}
                            src={"https://res.cloudinary.com/dr7uvhdmd/image/upload/v1698279794/taskpro/taskmgmt_image_krhumz.png"}
                        />
                    </Col>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{otherFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default TaskForm;