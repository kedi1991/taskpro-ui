import { Container } from 'react-bootstrap';
import './App.css';
import SideNavBar from './components/SideNavBar';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults';
import RegisterForm from './pages/auth/RegisterForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './pages/tasks/TaskForm';
import TaskView from './pages/tasks/TaskView';
import TasksView from './pages/tasks/TasksView';
import ProjectForm from './pages/projects/ProjectForm';
import ProjectView from './pages/projects/ProjectView';
import TopNavBar from './components/TopNavBar';

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
          <TopNavBar>
            
          </TopNavBar>
          <SideNavBar>
          </SideNavBar>
          <Container>
            <Switch>
              <Route exact path="/" render={() => <h1>Welcome to the Task PRO</h1>} />
              <Route exact path="/signin" render={() => <SignInForm></SignInForm>} />
              <Route exact path="/register" render={() => <RegisterForm></RegisterForm>} />
              <Route exact path="/task/create" render={() => <TaskForm></TaskForm>} />
              <Route exact path="/tasks/:id" render={() => <TaskView></TaskView>} />
              <Route exact path="/tasks/delete/:id" render={() => <h1>Delete the task</h1>} />
              <Route exact path="/tasks/edit/:id" render={() => <h1>Edit the task</h1>} />
              <Route exact path="/project/create" render={() => <ProjectForm></ProjectForm>} />
              <Route exact path="/projects/:id" render={() => <ProjectView></ProjectView>} />
              <Route exact path="/projects/delete/:id" render={() => <h1>Delete the project</h1>} />
              <Route exact path="/projects/edit/:id" render={() => <h1>Edit the project</h1>} />
              <Route render={() => 
              <p>The gods are wise, but they can't seem to understand your request!</p>} />
            </Switch>
          </Container>
        </div >
      </SetActiveUserContext.Provider>
    </ActiveUserContext.Provider>
  );
}

export default App;