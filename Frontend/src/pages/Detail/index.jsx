import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/CardProduct";
import Header from "../../components/Header";
import useProducts from "../../hooks/useProducts";
import styles from './index.module.css'

export default function Detail() {
    const { id } = useParams();
    const { product, setId } = useProducts();

    useEffect(() => {
        setId(id)
    }, [id])
    return (
        <>
            <Header />
            <section className={styles.productsDetail}>
                {product && <CardProduct product={product} detail={true} />}
            </section>
        </>
    );
}
