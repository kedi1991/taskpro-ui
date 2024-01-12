import { useContext, useState } from 'react';
import { Accordion, Container, Nav, NavLink, Navbar } from 'react-bootstrap';
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
      <Navbar className="bg-body-secondary">
        <Container>
          <Navbar.Brand href="#home">TaskPro v1.0</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Container>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavBar;