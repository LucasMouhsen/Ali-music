import axios from 'axios';

export async function productService(id) {
  const url = `http://localhost:3000/api/products/?id=${id}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.data[0];
  } catch (error) {
    console.error('Hubo un error al realizar la solicitud:', error);
    throw error;
  }
}

