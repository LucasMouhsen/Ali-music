import axios from 'axios';

export async function productsService() {
  const url = `http://localhost:3000/api/products`;

  try {
    const response = await axios.get(url);

    // Axios automáticamente arrojará un error para respuestas no exitosas (códigos de estado no 2xx)
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Hubo un error al realizar la solicitud:', error);
    throw error;
  }
}
