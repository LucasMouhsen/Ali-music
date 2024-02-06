import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import useModal from '../../hooks/useModal';

export default function Header() {
    const { toogleModal } = useModal()
    return (
        <div className={styles.header}>
            <ul className={styles.headerList}>
                <li><a href="/" className={styles.title}>AliMusic</a></li>
            </ul>
            <div >
                <FontAwesomeIcon icon={faCartShopping} onClick={toogleModal} />
            </div>
        </div>
    );
};
