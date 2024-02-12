import axios from 'axios';

export default async function groupCategoriesService() {
    const url = `http://localhost:3000/api/products/groupCategories`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

