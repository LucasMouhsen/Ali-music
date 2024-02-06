import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"
import styles from "./index.module.css"
import useCart from "../../hooks/useCart"
import { ModalCard } from "./Card/index"
import useModal from "../../hooks/useModal"


export default function CartModal() {
    const { isOpen, toogleModal } = useModal()
    const { cart, clearCart, totalPriceCart, sendOrder } = useCart();
    function handleClearCart() {
        clearCart()
    }
    
    if (isOpen) return (
        <div className={styles.modalBg} >
            <div className={styles.modal}>
                <FontAwesomeIcon icon={faXmarkCircle} className={styles.icon} onClick={toogleModal} />
                <h2 className={styles.h2Modal}>Mi carrito</h2>
                <section className={styles.modalBody}>
                    <div className={styles.modalDriksListContainer}>
                        {
                            cart.cartItems.map((product) => (
                                <ModalCard key={product.id} product={product}/>
                            ))
                        }

                    </div>
                </section>
                <aside className={styles.cardAside}>
                    <p>SubTotal: $ {totalPriceCart}</p>
                    <p>Total: $ {totalPriceCart}</p>
                    <div className={styles.btnContainer}>
                        <button className={styles.clearCart} onClick={() => handleClearCart()}>Vaciar carrito</button>
                        <button className={styles.confirmOrder} onClick={() => sendOrder()}>Confirmar compra</button>
                    </div>
                </aside>
            </div>
        </div>
    )
}