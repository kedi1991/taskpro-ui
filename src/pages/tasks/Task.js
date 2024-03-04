import React from "react";
import styles from "../../styles/TaskForm.module.css";
import { Card } from "react-bootstrap";


const Task = (props) => {
    const {
        task_name,
        description,
        assignees,
        project,
        status,
        attachment,

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