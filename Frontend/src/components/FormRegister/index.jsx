import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function FormRegister({ styles }) {
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
    const handleSubmit = (values) => {
        console.log(values);
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
                                <Field
                                    id="firstName"
                                    placeholder="Nombre"
                                    name="firstName"
                                    className={styles.input}
                                />

                                <Field
                                    id="lastName"
                                    placeholder="Apellido"
                                    name="lastName"
                                    className={styles.input}
                                />

                                <Field
                                    id="userName"
                                    placeholder="Usuario"
                                    name="userName"
                                    className={styles.input}
                                />

                                <Field
                                    id="email"
                                    placeholder="Mail"
                                    name="email"
                                    className={styles.input}
                                    autoComplete="email"
                                />

                                <Field
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    name="password"
                                    className={styles.input}
                                    autoComplete="password"
                                />

                                <Field
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
                                    Registrarse
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