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
    const storedToken = window.localStorage.getItem('loginAppUser');
    const isAuthenticated = !!storedToken;

    
    const hangleLogOut = () => {
        window.localStorage.removeItem('loginAppUser');
        return window.location.href = '/login'
    }

    function toggleCategory(category) {
        window.location.href = '/products'
        return setCategory(category)
    }
    return (
        <div className={styles.header}>
            <div className={styles.headerBottom}>
                <div className={styles.boxPages}>
                    <Button text='Inicio'  href={() => window.location.href = '/'}/>
                    <Button text='Productos' href={() => window.location.href = '/products'} />
                    <Button text='About' href={() => window.location.href = '/about'} />
                    <Button text='Support' href={() => window.location.href = '/support'} />
                </div>
                <div className={styles.boxButton}>
                    {isAuthenticated ?
                    <>
                        <Button text='Log out' href={hangleLogOut}  /> 
                        <Button text='Perfil' href={() => window.location.href = '/profile'}  /> 
                    </>
                        :
                        <Button text='Log in' href={() => window.location.href = '/login'} />}
                    <div
                        onClick={toogleModal}>
                        <Button text='cart' />
                    </div>
                    <CartModal />
                </div>
            </div>
        </div>
    );
};
