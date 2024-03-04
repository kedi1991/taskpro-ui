import { useState, useEffect } from 'react';
import axios from 'axios';

const useRegisteredUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get('/profiles/')
      .then(response => {
        setData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // ensures effect runs only once after initial render

  return { data, loading }; // Return data and loading state
}

export default useRegisteredUsers;
