import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function SideNavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
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
                <a href='#'>Add task</a><br/>
                <a href='#'>Delete task</a><br/>
                <a href='#'>Edit task</a><br/>

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
            <a href='/register'>Sign out</a>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavBar;