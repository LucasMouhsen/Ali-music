import { Formik } from 'formik';
import * as Yup from 'yup';
import { userRegister } from '../../services/userRegister.services';
import { useState } from 'react';
import { InputForm } from '../input';

export default function FormRegister({ styles }) {
    const [loading, setLoading] = useState()
    const initialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        password2: '',
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('El campo nombre es obligatorio'),
        lastName: Yup.string().required('El campo apellido es obligatorio'),
        userName: Yup.string().required('El campo usuario es obligatorio'),
        email: Yup.string().required('El campo mail es obligatorio'),
        password: Yup.string().required('El campo contraseña es obligatorio'),
        password2: Yup.string().required('El campo contraseña es obligatorio'),
    })

    const registerUser = async (values) => {
        setLoading(true);
        try {
            if (values) {
                const { firstName, lastName, userName, email, password, password2 } = values;
                const data = await userRegister(firstName, lastName, userName, email, password, password2);
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
            const token = await registerUser(values);
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

        <section className={styles.RegisterSection}>
            <div className={styles.RegisterContainer}>
                <p className={styles.title}>Registrarse</p>
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
                                    id="firstName"
                                    placeholder="Nombre"
                                    name="firstName"
                                    className={styles.input}
                                />
                                <InputForm
                                    id="lastName"
                                    placeholder="Apellido"
                                    name="lastName"
                                    className={styles.input}
                                />
                                <InputForm
                                    id="userName"
                                    placeholder="Usuario"
                                    name="userName"
                                    className={styles.input}
                                />
                                <InputForm
                                    id="email"
                                    placeholder="Mail"
                                    name="email"
                                    className={styles.input}
                                    autoComplete="email"
                                />
                                <InputForm
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    name="password"
                                    className={styles.input}
                                    autoComplete="password"
                                />
                                <InputForm
                                    id="password2"
                                    type="password"
                                    placeholder="Repetir Contraseña"
                                    name="password2"
                                    className={styles.input}
                                    autoComplete="new-password"
                                />
                                <button
                                    className={styles.formBtn}
                                    type='submit'
                                >
                                    {loading ? 'Cargando...' : 'Registrarme'}
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