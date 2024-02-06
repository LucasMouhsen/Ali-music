import styles from './index.module.css'
import useCategories from '../../hooks/useCategories'
import useProducts from '../../hooks/useProducts'

export default function SlideSearch() {
    const { categories } = useCategories()
    const { setCategory } = useProducts()

    function toggleCategory(category) {
        setCategory(category)
    }
    return (
        <aside className={styles.slideSearch}>
            <h3 className={styles.title}>Categorias</h3>
            <ul>
                {categories && categories.map((category) => {
                    return (
                        <li
                            key={category.id}
                            className={styles.category}
                            onClick={() => toggleCategory(category.id)}>
                            {category.category}
                        </li>
                    )
                })}
                <li className={styles.category} onClick={() => toggleCategory()}>Eliminar filtro</li>
            </ul>
        </aside>
    )
}