import React from 'react';
import styles from './index.module.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import useModal from '../../hooks/useModal';
import Button from '../Button';
import useProducts from '../../hooks/useProducts';
import CartModal from '../../components/CartProduct';

export default function Header() {
    const { toogleModal } = useModal()
    const { products, setCategory } = useProducts()

    function toggleCategory(category) {
        setCategory(category)
    }
    return (
        <div className={styles.header}>
            <div className={styles.headerBottom}>
                <div className={styles.boxPages}>
                    <Button text='Productos' href="/products" />
                    <Button text='Guitarras' onClick={toggleCategory} href="/products" />
                    <Button text='About' href="/about" />
                    <Button text='Support' href="/support" />
                </div>
                <div className={styles.boxButton}>
                    <Button text='Log in' href="/login" />
                    <div 
                        onClick={toogleModal}>
                        <Button text='cart' href='#cart' /> 
                    </div>
                    <CartModal />
                </div>
            </div>
        </div>
    );
};
