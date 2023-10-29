import React from "react";
import styles from "../../styles/TaskForm.module.css";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const Project = (props) => {
    const {
        id,
        owner,
        created_at,
        updated_at,
        project_name,
        is_owner,
    } = props;

    return (
        <Card className={styles.Project}>
            <Card.Body>
                {project_name && <Card.Title className="text-center">{project_name}</Card.Title>}
                
            </Card.Body>
        </Card>
    );
};

export default Project;