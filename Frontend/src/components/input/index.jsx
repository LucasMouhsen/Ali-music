import styles from "./index.module.css";
import { ErrorMessage, Field } from 'formik';

export const InputForm = ({
    label,
    type,
    name,
    id,
    error,
    placeholder,
    autoComplete
}) => {
    return (
        <div className={styles.group}>

            <Field
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={`${error ? 'border-red' : 'border-gray'} ${styles.input}`}
            />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label htmlFor={name}>
                {label}
            </label>
            <div className={styles.error}>
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}
