import styles from './index.module.css'
export default function Button({ text, href }) {
    return (
        <button className={styles.button} onClick={() => window.location.href = href}> {text}
        </button>
    )
}