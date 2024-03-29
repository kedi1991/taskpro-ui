import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import axios from "axios";
import { useLocation } from "react-router";

function ProjectsView() {
    const [projects, setProjects] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get("/projects/");
                setTasks(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchTasks();
    }, [pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>
                <>
                    {projects.results.length ? (
                        projects.results.map((task) => (
                            <Project key={project.id} {...project} setProjects={setProjects} />
                        ))
                    ) : (
                        <Container className={appStyles.Content}>
                            Nothing to display

                        </Container>
                    )}
                </>
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default ProjectsView;