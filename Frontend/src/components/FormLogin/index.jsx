import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userLogin } from '../../services/userLogin.services';
import { useState } from 'react';
import { InputForm } from '../input';

export default function FormLogin({ styles }) {
    const [loading, setLoading] = useState(false);
    const initialValues = {
        emailLogin: '',
        passwordLogin: '',
    }

    const validationSchema = Yup.object({
        emailLogin: Yup.string().required('El campo mail es obligatorio'),
        passwordLogin: Yup.string().required('El campo contraseña es obligatorio')
    })

    const loginUser = async (id) => {
        setLoading(true);
        try {
            if (id) {
                const { emailLogin, passwordLogin } = id;
                const data = await userLogin(emailLogin, passwordLogin);
                if (data) {
                    return data
                }
                return
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const token = await loginUser(values);
            if (token) {
                window.localStorage.setItem('loginAppUser', JSON.stringify(token));
                return window.location.href = '/profile'
            }
            return
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };
    return (
        <section className={styles.loginSection}>
            <div className={styles.loginContainer}>
                <p className={styles.title}>Iniciar sesión</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        (formik) => (
                            <form className={styles.form} onSubmit={formik.handleSubmit}>
                                {
                                    formik.status && (
                                        <Alert variant='danger'>
                                            {formik.status}
                                        </Alert>
                                    )
                                }
                                <InputForm
                                    id="emailLogin"
                                    placeholder="Mail"
                                    name="emailLogin"
                                    className={styles.input}
                                    autoComplete="email"
                                />
                                <InputForm
                                    id="passwordLogin"
                                    type="password"
                                    placeholder="Contraseña"
                                    name="passwordLogin"
                                    className={styles.input}
                                    autoComplete="password"
                                />
                                <button
                                    className={styles.formBtn}
                                    type='submit'
                                >
                                    {loading ? 'Cargando...' : 'Iniciar  Sesión'}
                                </button>
                            </form>
                        )}
                </Formik>
                <div className={styles.buttonsContainer}>
                    <div className={styles.googleLoginButton}>
                        <img src="/svg/google.svg" alt="" />
                        <span>Inicia con Google</span>
                    </div>
                </div>
            </div>
        </section>
    )
}