import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function FormLogin({styles}) {
    const initialValues = {
        emailLogin: '',
        passwordLogin: '',
    }

    const validationSchema = Yup.object({
        emailLogin: Yup.string().required('El campo mail es obligatorio'),
        passwordLogin: Yup.string().required('El campo contraseña es obligatorio')
    })
    const handleSubmit = (values) => {
        console.log(values);
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
                                <Field
                                    id="emailLogin"
                                    placeholder="Mail"
                                    name="emailLogin"
                                    className={styles.input}
                                    autoComplete="email"
                                />

                                <Field
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
                                    Iniciar  Sesión
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