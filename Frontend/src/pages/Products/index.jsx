import React from 'react';
import Header from "../../components/Header";
import CardProducts from "../../components/CardProduct";
import useProducts from '../../hooks/useProducts'
import styles from './index.module.css'
import SlideSearch from '../../components/SlideSearch';
import CardProductsEmpty from '../../components/CardProductEmpty';
import CartModal from '../../components/CartProduct';

export default function Products() {
    const { products, loading } = useProducts()

    return (
        <>
            <Header />
            <CartModal/>
            <main className={styles.products}>
                <SlideSearch />
                <section className={styles.productsList}>
                    {loading ?
                        <CardProductsEmpty/> :
                        products && products.map(product => {
                            return (
                                <CardProducts key={product.id} product={product} />
                            )
                        })
                    }
                </section>
            </main>
        </>
    );
}