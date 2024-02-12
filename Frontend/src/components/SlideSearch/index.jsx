import styles from './index.module.css'
import useCategories from '../../hooks/useCategories'
import useProducts from '../../hooks/useProducts'

export default function SlideSearch() {
    const { categories, groupCategories } = useCategories()
    const { setCategory } = useProducts()

    function toggleCategory(category) {
        setCategory(category)
    }   
    return (
        <aside className={styles.slideSearch}>
            <h3 className={styles.title}>Categorías</h3>
            <ul>
                {groupCategories.map(group => (
                    <li key={group.id}>
                        <h4>{group.category}</h4>
                        <ul>
                            {categories.filter(category => category.groupId === group.id)
                                .map(category => (
                                    <li
                                        key={category.id}
                                        className={styles.category}
                                        onClick={() => toggleCategory(category.id)}>
                                        {category.category}
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))}
                <li className={`${styles.category} ${styles.deleteFilter}`} onClick={() => toggleCategory()}>Eliminar filtro</li>
            </ul>
        </aside>
    )
}
