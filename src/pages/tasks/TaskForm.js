import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/TaskForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TaskForm() {

    const [errors, setErrors] = useState({});
    const history = useHistory();

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
        formData.append("assignees", assignees);
        formData.append("project", project);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("attachment", attachment);

        try {

            const { data } = await axios.post("/tasks/", formData);
            history.push(`/tasks/${data.id}`);

        } catch (err) {
            console.log(err);
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
                <Form.Control type="text" name="assignees" value={assignees} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Control type="text" name="project" value={project} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" name="status" value={status} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="attachment">
                <Form.Label>attachment</Form.Label>
                <Form.Control type="text" name="attachment" value={attachment} onChange={handleChange} />
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
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">

                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload"
                            >
                                Upload your file attachment
                            </Form.Label>

                        </Form.Group>
                        <div className="d-md-none">{otherFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{otherFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default TaskForm;