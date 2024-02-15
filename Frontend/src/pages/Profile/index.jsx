import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";
import Header from "../../components/Header";
import useProducts from "../../hooks/useProducts";
import useUser from "../../hooks/useUser";
import styles from './index.module.css'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { InputForm } from "../../components/input";
import { ProductProfile } from "../../components/ProductProfile";
import { CartProfile } from "../../components/cartProfile";
export default function Profile() {
    const { user, loading: loadingUser } = useUser()
    const { products, loading: loadingProducts } = useProducts()
    const [productUser, setProductUser] = useState([]);
    const [edit, setEdit] = useState(true)

    useEffect(() => {
        if (user && products && products.length > 0) {
            const productUserFilter = products.filter((product) => product.userId === user.id)
            setProductUser(productUserFilter)
        }
    }, [products, user])

    function toggleEdit() {
        setEdit(!edit)
    }
    const initialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        password2: '',
    }

    const validationSchema = Yup.object({
        image: Yup.object().shape({
            myFile: Yup.mixed().required('required')
                .test('fileFormat', 'Only PDF files are allowed', value => {
                    if (value) {
                        const supportedFormats = ['pdf'];
                        return supportedFormats.includes(value.name.split('.').pop());
                    }
                    return true;
                })
        }),
        firstName: Yup.string().required('El campo nombre es obligatorio'),
        lastName: Yup.string().required('El campo apellido es obligatorio'),
        userName: Yup.string().required('El campo usuario es obligatorio'),
        email: Yup.string().required('El campo mail es obligatorio'),
        password: Yup.string().required('El campo contraseña es obligatorio'),
        password2: Yup.string().required('El campo contraseña es obligatorio'),
    })
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
    const handleChangeImage = (e) => {
        console.log(e.target)
        formik.setFieldValue('image', e.target.files[0]);
    };
    return (
        <>
            <Header />
            {
                loadingUser && loadingProducts ?
                    <h1>Cargando</h1> :
                    <div className={styles.boxProfile}>
                        <div className={styles.boxInfo}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {
                                    (formik) => (
                                        <form className={styles.form} onSubmit={formik.handleSubmit}>
                                            <div className={styles.boxTitle}>
                                                <h2 className={styles.title} >Mi perfil</h2>
                                                <FontAwesomeIcon className={styles.icon} icon={faEdit} onClick={toggleEdit} />
                                            </div>
                                            <div className={styles.boxImage}>
                                                <img className={styles.image} src={`images/fotoUser/${user?.avatar}`}></img>
                                                <InputForm type='file' name='image' accept='.pdf' onChange={handleChangeImage} />


                                            </div>
                                            <div className={styles.boxDataUser}>
                                                <p className={styles.dataUser}>Usuario:
                                                    {edit ? <span>{user?.userName} </span> :
                                                        <InputForm
                                                            name={'userName'}
                                                            placeholder={'Nombre de usuario'}
                                                            id="userName"
                                                            className={styles.group}
                                                        />
                                                    }
                                                </p>
                                                <p className={styles.dataUser}>Nombre:
                                                    {edit ? <span>{user?.firstName} </span> :
                                                        <InputForm
                                                            name={'firstName'}
                                                            placeholder={'Nombre'}
                                                            id="firstName"
                                                        />
                                                    }
                                                </p>
                                                <p className={styles.dataUser}>Apellido:
                                                    {edit ? <span>{user?.lastName} </span> :
                                                        <InputForm
                                                            name={'lastName'}
                                                            placeholder={'Apellido'}
                                                            id="lastName"
                                                        />
                                                    }
                                                </p>
                                                <p className={styles.dataUser}>Teléfono:
                                                    {edit ? <span>{user?.number} </span> :
                                                        <InputForm
                                                            name={'number'}
                                                            placeholder={'Numero'}
                                                            id="number"
                                                        />
                                                    }
                                                </p>
                                                <p className={styles.dataUser}>Email:
                                                    {edit ? <span>{user?.email} </span> :
                                                        <InputForm
                                                            name={'email'}
                                                            placeholder={'Email'}
                                                            id="email"
                                                        />
                                                    }
                                                </p>
                                            </div>
                                        </form>
                                    )}
                            </Formik>
                        </div>
                        <ProductProfile productUser={productUser} user={user} styles={styles}/>
                        <CartProfile styles={styles}/>
                    </div>
            }
        </>
    )
}