import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { productsService } from "../services/products.services";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await productsService();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario.
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  


  const contextValues = {
    products: products.data,
    iTotalRecords: products.iTotalRecords,
    loading
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