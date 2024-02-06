import React from 'react';
import styles from './index.module.css';

export default function CardProductsEmpty() {
    const emptyProducts = Array.from({ length: 8 });

    return (
        emptyProducts.map((_, index) => (
            <div key={index} className={styles.cardProduct}>
                <div className={styles.containerLoader}>
                    <div className={styles.loader}></div>
                </div>
                <div className={styles.infoProduct}>
                    <span className={styles.titleProduct}>Cargando</span>
                    <span className={styles.priceProduct}>$ ???</span>
                </div>
            </div>
        ))
    );
}
