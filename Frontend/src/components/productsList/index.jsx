import React from 'react';
import CardProducts from "../../components/CardProduct";
import useProducts from '../../hooks/useProducts'
import styles from './index.module.css'
import SlideSearch from '../../components/SlideSearch';
import CardProductsEmpty from '../../components/CardProductEmpty';

export default function ProductsList() {
    const { products, loading } = useProducts()

    return (
        <main className={styles.products}>
            <SlideSearch />
            <section className={styles.productsList}>
                {loading ?
                    <CardProductsEmpty /> :
                    products && products.map(product => {
                        return (
                            <CardProducts key={product.id} product={product} />
                        )
                    })
                }
            </section>
        </main>
    );
}