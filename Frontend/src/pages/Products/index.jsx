import React from 'react';
import Header from "../../components/Header";
import useProducts from '../../hooks/useProducts'
import ProductsList from '../../components/productsList';

export default function Products() {
    const { products, loading } = useProducts()

    return (
        <>
            <Header />
            <ProductsList/>
        </>
    );
}