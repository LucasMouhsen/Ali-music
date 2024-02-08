import { useState } from "react";
import FormLogin from "../../components/FormLogin";
import FormRegister from "../../components/FormRegister";
import Header from "../../components/Header";
import styles from './index.module.css'

export default function Login() {
    const [showLogin, setShowLogin] = useState(false);

    const toggleShowLogin = () => {
        setShowLogin(prevShowLogin => !prevShowLogin);
    };

    return (
        <>
            <Header />
            <main className={styles.login}>
                <div className={styles.background}></div>
                <div className={styles.boxUser}>
                    <div className={`${styles.registerSection} ${showLogin ? styles.formNoTransition : styles.formTransition}`}>
                        <FormRegister styles={styles} show={setShowLogin} />
                    </div>
                    <div className={`${styles.loginSection} ${showLogin ? styles.formTransition : ""}`}>
                        <FormLogin styles={styles} show={setShowLogin} />
                    </div>
                    <div className={styles.boxSwitch} >
                        <input className={styles.switch} type="checkbox" onClick={toggleShowLogin} />
                    </div>
                </div>
            </main>
        </>
    );
}

