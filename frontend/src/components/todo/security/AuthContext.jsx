import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated]= useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // const login = async (username, password) => {
    
  //   const basicAuthToken = 'Basic ' + window.btoa(`${username}:${password}`);
    
  //   try {
  //     const response = await executeBasicAuthenticationService(basicAuthToken);

  //     if (response.status === 200) {
  //       setIsAuthenticated(true);
  //       setUsername(username);
  //       setToken(basicAuthToken);

  //       apiClient.interceptors.request.use((config) => {
  //         config.headers.Authorization = basicAuthToken;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch(error) {
  //     logout();
  //     return false;
  //   }

  // }

  const login = async (username, password) => {
    
    try {
      const response = await executeJwtAuthenticationService(username, password);
      if (response.status === 200) {
        const jwtToken = `Bearer ${response.data.token}`;
        setIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch(error) {
      logout();
      return false;
    }

  }

  function logout() {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.any
}