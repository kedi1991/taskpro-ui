import { Container } from 'react-bootstrap';
import './App.css';
import SideNavBar from './components/SideNavBar';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults';
import RegisterForm from './pages/auth/RegisterForm';
import SignInForm from './pages/auth/SignInForm';



function App() {
  return (
    <div className="App">
      <SideNavBar>
      </SideNavBar>
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm></SignInForm>} />
          <Route exact path="/register" render={() => <RegisterForm></RegisterForm> } />
          <Route render={() => <p>The gods are wise, but they can't seem to understand your request!</p>} />
        </Switch>
      </Container>

    </div >
  );
}

export default App;