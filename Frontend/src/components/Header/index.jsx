import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import './index.css'

import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa los estilos de Font Awesome

export default function Header() {
    return (
        <div className={'header'}>
            <ul className='headerList'>
                <li><a href="/" className='title'>AliMusic</a></li>
            </ul>
            <div >
                <input type="text" placeholder="Buscar..." id="searchInput"/>
            </div>
        </div>
    );
};
