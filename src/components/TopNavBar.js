import { useContext, useState } from 'react';
import { Accordion, Container, Nav, NavLink, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ActiveUserContext, SetActiveUserContext, useSetActiveUser } from '../App';
import styles from "../styles/AuthForms.module.css";
import axios from 'axios';

function TopNavBar() {
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
      <Navbar className="bg-body-secondary" fixed='top'>

        <Container>
          <Nav className="me-auto">
            <Navbar.Brand>
              TASK PRO 1
            </Navbar.Brand>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className='mr-auto'>
              <NavDropdown title="Tasks" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">View tasks</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Add task
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Edit task</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Delete task
                </NavDropdown.Item>
              </NavDropdown>
             
              <NavDropdown title="Projects" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">View projects</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Add project
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Edit project</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Delete project
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Navbar.Text>
              Signed in as: <a href="#login">Kedi</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>


      </Navbar>
    </>
  );
}

export default TopNavBar;