import { useContext, useState } from 'react';
import { Accordion, Container, Nav, NavLink, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ActiveUserContext, SetActiveUserContext, useSetActiveUser } from '../App';
import styles from "../styles/TopNavBar.module.css";
import axios from 'axios';

function TopNavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const activeUser = useContext(ActiveUserContext)
  const setActiveUser = useSetActiveUser();

  //handle signout
  
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setActiveUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Icons to display when logged in

  const iconsLoggedIn = <>
    <NavDropdown title="Tasks" id="basic-nav-dropdown">
      <NavDropdown.Item href="/tasks">View tasks</NavDropdown.Item>
      <NavDropdown.Item href="/task/create">
        Add task
      </NavDropdown.Item>
      <NavDropdown.Item href="/task/edit/:id">Edit task</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/task/delete/:id">
        Delete task
      </NavDropdown.Item>
    </NavDropdown>

    <NavDropdown title="Projects" id="basic-nav-dropdown">
      <NavDropdown.Item href="/projects">View projects</NavDropdown.Item>
      <NavDropdown.Item href="/project/add">
        Add project
      </NavDropdown.Item>
      <NavDropdown.Item href="/project/edit/:id">Edit project</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/project/delete/:id">
        Delete project
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title= "activeUser" id="account-dropdown">
      <NavDropdown.Item href="/" onClick={handleSignOut}>Sign out</NavDropdown.Item>
      
    </NavDropdown>
    <Navbar.Text>
      Signed in as: <a href="#login"></a>
    </Navbar.Text>
  </>

  //Icons to display when logged out

  const iconsLoggedOut = <>
    <Navbar.Text>
      <a href="/signin">Sign In</a>
    </Navbar.Text>
    <Navbar.Text>
      <a href="/register">Sign Up</a>
    </Navbar.Text>

  </>

  return (
    <>
      <Navbar className={styles.TopNavBar} fixed='top'>

        <Container>
          <Nav className="me-auto">
            <Navbar.Brand>
              TASK PRO 1
            </Navbar.Brand>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className='mr-auto'>
              {activeUser ? iconsLoggedIn : iconsLoggedOut}
            </Nav>

          </Navbar.Collapse>
        </Container>


      </Navbar>
    </>
  );
}

export default TopNavBar;