import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import Task from "./Task";
import axios from "axios";
import { useLocation } from "react-router";

function TasksView() {
    const [tasks, setTasks] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get("/tasks/");
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
                    {tasks.results.length ? (
                        tasks.results.map((task) => (
                            <Task key={task.id} {...task} setTasks={setTasks} />
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

export default TasksView;