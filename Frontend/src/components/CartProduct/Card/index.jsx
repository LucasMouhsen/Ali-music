import { PropTypes } from "prop-types"
import styles from "./index.module.css"
import useCart from "../../../hooks/useCart"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

export function ModalCard({product}) {
    const { addToCart, removeOneFromCart, removeAllFromCart } = useCart();
    function handleAddToCart(product) {
        addToCart(product)
    }
    function handleRemoveOneFromCart(product) {
        removeOneFromCart(product)
    }
    function handleRemoveAllFromCart(product) {
        removeAllFromCart(product)
    }
    return (
        <article className={styles.card}>
            <img src={`images/articulos/${product.images[0].image}`} alt="" />
            <div className={styles.drinkiInfo}>
                <span>{product.name}</span>
                <span>$ {product.price}</span>
            </div>
            <div className={styles.counter}>
                <FontAwesomeIcon icon={faMinus} className={styles.iconCounter} onClick={() => handleRemoveOneFromCart(product)} />
                <span className={styles.numberCounter}>{product.quantity}</span>
                <FontAwesomeIcon icon={faPlus} className={styles.iconCounter} onClick={() => handleAddToCart(product)} />
            </div>
            <FontAwesomeIcon icon={faTrash} className={styles.trash} onClick={() => handleRemoveAllFromCart(product)} />
        </article>
    )
}

ModalCard.propTypes = {
    product: PropTypes.object.isRequired
}