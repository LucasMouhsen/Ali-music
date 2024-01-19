import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import './index.modules.css'

import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa los estilos de Font Awesome

export default function Header() {
    return (
        <header className="header" id="header">
            <div className="header_container">
                <a href="/" className="header_logo">Ali Music</a>

                <div className="header_search">
                    <form action="/search" method="get" id="inputSearch">
                        <input type="search" placeholder="Buscar" className="header_input" name="search" id="inputSearchValue" />
                    </form>
                    <FontAwesomeIcon icon={faSearch} className='header_icon' />
                </div>

                <div className="header_toggle">
                    <FontAwesomeIcon icon={faBars} id="header_toggle" />
                </div>
            </div>
        </header>
    );
};
