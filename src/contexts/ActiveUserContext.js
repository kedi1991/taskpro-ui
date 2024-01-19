/**
 * Code duplicated from https://github.com/mr-fibonacci/moments/blob/a981c39da1671a70023a3d6f3cf1410164e84e06/src/contexts/CurrentUserContext.js 
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

export const ActiveUserContext = createContext();
export const SetActiveUserContext = createContext();

export const useActiveUser = () => useContext(ActiveUserContext);
export const useSetActiveUser = () => useContext(SetActiveUserContext);

export const ActiveUserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setActiveUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setActiveUser((prevActiveUser) => {
            if (prevActiveUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setActiveUser((prevActiveUser) => {
              if (prevActiveUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <ActiveUserContext.Provider value={activeUser}>
      <SetActiveUserContext.Provider value={setActiveUser}>
        {children}
      </SetActiveUserContext.Provider>
    </ActiveUserContext.Provider>
  );
};