import React from 'react';
import Header from "../../components/Header";
import CardProducts from "../../components/CardProduct";
import useProducts from '../../hooks/useProducts'
import styles from './index.module.css'

export default function Products() {
    const {products} = useProducts()
    
    return (
        <>
            <Header />
            <section className={styles.productsList}>
                {products && products.map((product) => {
                    return (
                        <CardProducts key={product.id} product={product} />
                    )
                })}
            </section>
        </>
    );
}