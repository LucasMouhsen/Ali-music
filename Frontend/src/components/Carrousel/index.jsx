import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './index.css';

export default function Carrousel() {
    const { products, iTotalRecords } = useProducts();
    const [activeOption, setActiveOption] = useState(null);

    if (!products || !iTotalRecords) return <h2>Cargando</h2>;

    
    const handleClick = (productId) => {
        setActiveOption(productId);
    };

    return (
        <div className="options">
            {products.slice(0, 6).map(product => (
                <div
                    className={`option ${activeOption === product.id ? 'active' : ''}`}
                    key={product.id}
                    style={{ backgroundImage: `url('images/articulos/${product?.images[0]?.image}')` }}
                    onClick={() => handleClick(product.id)}
                >
                    <div className="shadow"></div>
                    <div className="label">
                        <div className="info">
                            <div className="main">{product.name}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
