import { Container } from 'react-bootstrap';
import './App.css';
import './api/axiosDefaults';
import RegisterForm from './pages/auth/RegisterForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext } from 'react';
import TaskForm from './pages/tasks/TaskForm';
import TaskView from './pages/tasks/TaskView';
import ProjectForm from './pages/projects/ProjectForm';
import ProjectView from './pages/projects/ProjectView';
import TopNavBar from './components/TopNavBar';
import styles from './App.module.css'
import Tasks from './pages/tasks/Tasks';
import Projects from './pages/projects/Projects';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import TasksPage from './pages/tasks/TasksPage';

import { useActiveUser } from './contexts/ActiveUserContext';
import ProjectsPage from './pages/projects/ProjectsPage';

export const ActiveUserContext = createContext();
export const SetActiveUserContext = createContext();

function App() {

  const activeUser = useActiveUser();
  const profile_id = activeUser?.profile_id || ""

  return (
   
        <div className={styles.App}>
          <TopNavBar>
          </TopNavBar>
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Welcome to the Task PRO</h1>} />
              <Route exact path="/signin" render={() => <SignInForm></SignInForm>} />
              <Route exact path="/register" render={() => <RegisterForm></RegisterForm>} />
              <Route exact path="/tasks/" render={() => <TasksPage message="No tasks found with the used criteria." filter={`owner__profile=${profile_id}&`}></TasksPage>} />
              <Route exact path="/task/create" render={() => <TaskForm></TaskForm>} />
              <Route exact path="/tasks/:id" render={() => <TaskView></TaskView>} />
              <Route exact path="/tasks/delete/:id" render={() => <h1>Delete the task</h1>} />
              <Route exact path="/tasks/edit/:id" render={() => <h1>Edit the task</h1>} />
              <Route exact path="/project/add" render={() => <ProjectForm></ProjectForm>} />
              <Route exact path="/projects/" render={() => <ProjectsPage></ProjectsPage>} />
              <Route exact path="/projects/:id" render={() => <ProjectView></ProjectView>} />
              <Route exact path="/projects/delete/:id" render={() => <h1>Delete the project</h1>} />
              <Route exact path="/projects/edit/:id" render={() => <h1>Edit the project</h1>} />
              <Route render={() => 
              <p>The gods are wise, but they can't seem to understand your request!</p>} />
            </Switch>
          </Container>
        </div >

  );
}

export default App;