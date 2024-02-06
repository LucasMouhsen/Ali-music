import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css'

import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa los estilos de Font Awesome

export default function Header() {
    return (
        <div className={styles.header}>
            <ul className={styles.headerList}>
                <li><a href="/" className={styles.title}>AliMusic</a></li>
            </ul>
            <div >
               {/*  <input type="text" placeholder="Buscar..." id="searchInput"/> */}
            </div>
        </div>
    );
};
