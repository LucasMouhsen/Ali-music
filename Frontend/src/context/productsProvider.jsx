import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { productsService } from "../services/products.services";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const data = await productsService(category);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario.
      } finally {
        setLoading(false);
      }
    };
    getProducts();

  }, [category]);



  const contextValues = {
    products: products.data,
    iTotalRecords: products.iTotalRecords,
    loading,
    setCategory
  };

  return (
    <productContext.Provider value={contextValues}>
      {children}
    </productContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { productContext, ProductProvider };