import { Container } from 'react-bootstrap';
import './App.css';
import SideNavBar from './components/SideNavBar';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults';
import RegisterForm from './pages/auth/RegisterForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ActiveUserContext = createContext();
export const SetActiveUserContext = createContext();

export const useActiveUser = () => useContext(ActiveUserContext);
export const useSetActiveUser = () => useContext(SetActiveUserContext);

function App() {

  const [activeUser, setActiveUser] = useState(null);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setActiveUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <ActiveUserContext.Provider value={activeUser}>
      <SetActiveUserContext.Provider value={setActiveUser}>
        <div className="App">
          <SideNavBar>
          </SideNavBar>
          <Container>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/signin" render={() => <SignInForm></SignInForm>} />
              <Route exact path="/register" render={() => <RegisterForm></RegisterForm>} />
              <Route render={() => <p>The gods are wise, but they can't seem to understand your request!</p>} />
            </Switch>
          </Container>
        </div >
      </SetActiveUserContext.Provider>
    </ActiveUserContext.Provider>
  );
}

export default App;