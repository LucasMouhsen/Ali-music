import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoriesService from '../services/categories.services'

const categoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesService();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);



  const contextValues = {
    categories,
    loading
  };

  return (
    <categoriesContext.Provider value={contextValues}>
      {children}
    </categoriesContext.Provider>
  );
};

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { categoriesContext, CategoriesProvider };