import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Project from "./Project";

function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }] = await Promise.all([
          axios.get(`/projects/${id}`),
        ]);
        setProject({ results: [project] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Task for mobile</p>
        <Project {...project.results[0]} setProject={setProject} ProjectView />
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Project for desktop
      </Col>
    </Row>
  );
}

export default ProjectView;