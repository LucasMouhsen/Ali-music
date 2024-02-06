import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardProducts from "../../components/CardProduct";
import Header from "../../components/Header";
import useProducts from "../../hooks/useProducts";
import styles from './index.module.css'

export default function Detail() {
    const { id } = useParams();
    const { products } = useProducts();



    return (
        <>
            <Header />
            <section className={styles.productsDetail}>
                {products && <CardProducts product={products.filter((product) => product.id === Number(id))[0]} />}
            </section>
        </>
    );
}
