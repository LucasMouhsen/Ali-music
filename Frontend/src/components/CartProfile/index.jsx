import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const CartProfile = ({styles}) => {
    return (
        <div className={styles.boxCart}>
            <div className={styles.boxTitle}>
                <h2 className={styles.title} >Compras realizadas</h2>
                <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
            </div>
        </div>
    )
}
