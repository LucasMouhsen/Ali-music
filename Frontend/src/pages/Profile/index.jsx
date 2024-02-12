import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";
import Header from "../../components/Header";
import useProducts from "../../hooks/useProducts";
import useUser from "../../hooks/useUser";
import styles from './index.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
export default function Profile() {
    const { user, loading: loadingUser } = useUser()
    const { products, loading: loadingProducts } = useProducts()
    const [productUser, setProductUser] = useState([]);

    useEffect(() => {
        if (user && products && products.length > 0) {
            const productUserFilter = products.filter((product) => product.userId === user.id)
            setProductUser(productUserFilter)
        }
    }, [products, user])
    return (
        <>
            <Header />
            {
                loadingUser && loadingProducts ?
                    <h1>Cargando</h1> :
                    <div className={styles.boxProfile}>
                        <div className={styles.boxInfo}>
                            <div className={styles.boxTitle}>
                                <h2 className={styles.title} >Mi perfil</h2>
                                <FontAwesomeIcon className={styles.icon} icon={faEdit} />
                            </div>
                            <div className={styles.boxImage}>
                                <img className={styles.image} src={`images/fotoUser/${user?.avatar}`}></img>
                            </div>
                            <div className={styles.boxDataUser}>
                                <p className={styles.dataUser}>Usuario: <span>{user?.userName} </span></p>
                                <p className={styles.dataUser}>Nombre: <span>{user?.firstName} </span></p>
                                <p className={styles.dataUser}>Apellido: <span>{user?.lastName} </span></p>
                                <p className={styles.dataUser}>Teléfono: <span>{user?.number} </span></p>
                                <p className={styles.dataUser}>Email: <span> {user?.email} </span></p>
                            </div>
                        </div>
                        <div className={styles.boxProducts}>
                            <div className={styles.boxTitle}>
                                <h2 className={styles.title} >Mis productos</h2>
                                <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
                            </div>
                            <div className={styles.boxProduct}>
                                {
                                    productUser && productUser.slice(0, 3).map((product) => {
                                        if (product.userId === user.id) {
                                            return (
                                                <CardProduct key={product.id} product={product} detail={false} />
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.boxCart}>
                        <div className={styles.boxTitle}>
                                <h2 className={styles.title} >Compras realizadas</h2>
                                <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}