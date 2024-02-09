import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userProfile } from "../services/userprofile.services";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const getUser = async (token) => {
      setLoading(true);
      try {
        if (!user) {
          const data = await userProfile(`Bearer ${token}`);
          setUser(data)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
    const storedToken = window.localStorage.getItem('loginAppUser');
    if (storedToken) {
      // Elimina las comillas del token antes de pasarlo a getUser
      const token = storedToken.substring(1, storedToken.length - 1);
      getUser(token);
    }
  }, [])

  const contextValues = {
    loading,
    user
  };

  return (
    <userContext.Provider value={contextValues}>
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { userContext, UserProvider };