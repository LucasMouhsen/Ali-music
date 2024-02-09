import CardProduct from "../../components/CardProduct";
import Header from "../../components/Header";
import useProducts from "../../hooks/useProducts";
import useUser from "../../hooks/useUser";
import styles from './index.module.css'
export default function Profile() {
    const { user, loading } = useUser()
    const { products } = useProducts()
    return (
        <>
            <Header />
            {
                loading ?
                    <h1>Cargando</h1> :
                    <div className={styles.boxProfile}>
                        <div className={styles.boxInfo}>
                            <h2 className={styles.title}>Mi perfil</h2>
                            <div className={styles.boxImage}>
                                <img className={styles.image} src={`images/fotoUser/${user?.avatar}`}></img>
                            </div>
                            <div className={styles.boxDataUser}>
                                <p className={styles.dataUser}>Usuario: <span>{user?.userName}</span></p>
                                <p className={styles.dataUser}>Nombre: <span>{user?.firstName + ' ' + user?.lastName}</span></p>
                                <p className={styles.dataUser}>Teléfono: <span>{user?.number != null ? 'no hay' : user?.number}</span></p>
                                <p className={styles.dataUser}>Email: <span> {user?.email} </span></p>
                            </div>
                        </div>
                        <div className={styles.boxCart}>
                            <h2 className={styles.title}>Compras realizadas</h2>
                        </div>
                        <div className={styles.boxProducts}>
                            <h2 className={styles.title}>Mis productos</h2>
                            <div className={styles.boxProduct}>
                                {products && products.map((product) => {
                                    if (product.userId === user.id) {
                                        return (
                                            <CardProduct key={product.id} product={product} detail={false} />
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}