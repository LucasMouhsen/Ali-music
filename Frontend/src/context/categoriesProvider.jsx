import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoriesService from '../services/categories.services'
import groupCategoriesService from "../services/groupCategories.services";

const categoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [groupCategories, setGroupCategories] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCategoriesAll = async () => {
      try {
        setLoading(true);
        const categoriesData = await categoriesService();
        const groupCategoriesData = await groupCategoriesService();
        setCategories(categoriesData);
        setGroupCategories(groupCategoriesData)
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };
    getCategoriesAll();
  }, []);



  const contextValues = {
    categories,
    groupCategories,
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