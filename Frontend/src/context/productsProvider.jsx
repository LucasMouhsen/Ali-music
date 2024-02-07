import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { productsService } from "../services/products.services";
import { productService } from "../services/product.services";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        console.log(id);
        if (id) {
          const currenProduct = await productService(id);
          setProduct(currenProduct)
        } else {
          const data = await productsService(category);
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();

  }, [category, id]);



  const contextValues = {
    products: products.data,
    iTotalRecords: products.iTotalRecords,
    loading,
    setCategory,
    product,
    setId
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