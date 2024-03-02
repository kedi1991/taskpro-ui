import { useState, useEffect } from 'react';
import axios from 'axios';

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/projects/')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching project data:', error);
      });
  }, []); // ensures effect runs only once after initial render

  return { projects }; // Return data and loading state
}

export default useProjects;
