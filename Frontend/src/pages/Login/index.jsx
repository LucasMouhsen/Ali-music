import Header from "../../components/Header";
import styles from './index.module.css'
export default function Login() {
    return (
        <>
            {/* <Header /> */}
            <section className={styles.login}>
                <div className={styles.container}>
                    <form className={styles.form} action="">
                        <p className={styles.title}>Login Form</p>
                        <input placeholder="Email" className={`${styles.email} ${styles.input}`} type="text" />
                        <input placeholder="Password" className={`${styles.password} ${styles.input}`} type="password" />
                        <button className={styles.btn} type="submit">Login</button>
                    </form>
                </div>
            </section>
        </>
    )
}