import { useContext, useState } from 'react';
import { Accordion, NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ActiveUserContext, SetActiveUserContext, useSetActiveUser } from '../App';
import styles from "../styles/AuthForms.module.css";
import axios from 'axios';

function SideNavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const activeUser = useContext(ActiveUserContext) 
  const setActiveUser = useSetActiveUser();

  
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setActiveUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Show Navigation bar
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TaskPRO v1.0</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>TASKS</Accordion.Header>
              <Accordion.Body>
                <a href='#'>View tasks</a><br/>
                <a href='/task/create'>Add task</a><br/>
                <a href='/tasks/delete/:id'>Delete task</a><br/>
                <a href='/tasks/edit/:id'>Edit task</a><br/>

              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>PROJECTS</Accordion.Header>
              <Accordion.Body>
                <a href='#'>Create project</a><br/>
                <a href='#'>Edit project</a><br/>
                <a href='#'>View projects</a><br/>
              </Accordion.Body>
            </Accordion.Item>
            <br></br>
            <a href='/signin'>Sign in</a>
            <br></br>
            <a href='/register'>Register</a>
            <br></br>
            <a href='/' onClick={handleSignOut}>sign out</a>
            {activeUser? <h1>{activeUser.username}</h1> : <h1>Not logged in</h1>}

         
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavBar;