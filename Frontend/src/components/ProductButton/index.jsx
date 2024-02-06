import styles from './index.module.css'
export default function ProductButton({ text }) {
    return (
        <button className={styles.productButton}>
            {text}
        </button>
    )
}