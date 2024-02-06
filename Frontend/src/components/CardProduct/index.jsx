import React from 'react';
import styles from './index.module.css';
import useCart from '../../hooks/useCart'
import ProductButton from '../ProductButton';

export default function CardProducts({ product }) {
    const { addToCart } = useCart()
    function handleAddToCart(product) {
        addToCart(product)
    }
    return (
        <div className={styles.cardProduct} key={product.id}>
            <img className={styles.imageProduct} src={`images/articulos/${product.images[0].image}`} alt="Product" />
            <div className={styles.infoProduct}>
                <span className={styles.titleProduct}>{product.name}</span>
                <span className={styles.priceProduct}>${product.price}</span>
                <div className={styles.options}>
                    <div class={styles.buttonContainer}>
                        <button className={styles.button}>
                            <img src="svg\info.svg" alt="info" onClick={() => window.location.href = `/products/detail/${product.id}`} />
                        </button>
                        <button className={styles.button}>
                            <img src="svg\star.svg" alt="star"  onClick={() => console.log('Va a favoritos')} />
                        </button>

                        <button className={styles.button}>
                            <img src="svg\cart.svg" alt="cart" onClick={() => handleAddToCart(product)} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}