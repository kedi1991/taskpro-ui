import React from "react";
import styles from "../../styles/TaskForm.module.css";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskView from "./TaskView";

const Task = (props) => {
    const {
        id,
        owner,
        created_at,
        updated_at,
        task_name,
        description,
        assignees,
        project,
        status,
        attachment,
        is_owner,
    } = props;

    return (
        <Card className={styles.Post}>
            
            <Card.Body>
                {task_name && <Card.Title className="text-center">{task_name}</Card.Title>}
                {description && <Card.Text>{description}</Card.Text>}
                {assignees}<br></br>
                {project}<br></br>
                {status}<br></br>
                {attachment}<br></br>
                
            </Card.Body>
        </Card>
    );
};

export default Task;