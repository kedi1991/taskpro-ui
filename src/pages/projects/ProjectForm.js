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
import { Image } from "react-bootstrap";

function ProjectForm() {

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const [projectData, setProjectData] = useState({
        project_name: "",

    });
    const { project_name } = projectData;

    const handleChange = (event) => {
        setProjectData({
            ...projectData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("project_name", project_name);

        try {

            const { data } = await axios.post("/projects/", formData);
            alert("Project successfully craeted")
            history.push(`/projects/`);



        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const otherFields = (
        <div className="text-center">

            <Form.Group controlId="project_name">
                <Form.Label>Project name</Form.Label>
                <Form.Control type="text" name="project_name" value={project_name} onChange={handleChange} />
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

                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{otherFields}</Container>
                </Col>
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
            </Row>
        </Form>
    );
}

export default ProjectForm;