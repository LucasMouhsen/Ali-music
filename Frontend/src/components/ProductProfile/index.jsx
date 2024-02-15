import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardProduct from "../CardProduct"

export const ProductProfile = ({ productUser, user, styles }) => {
    return (
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
    )
}
