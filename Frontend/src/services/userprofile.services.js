import axios from 'axios';

export async function userProfile(token) {
  const url = 'http://localhost:3000/api/users/profile';

  try {
    // Make a request for a user with a given token.
    const response = await axios(url,{headers: { Authorization: `Bearer ${token}` } });
    /* const response = await axios.get(url, { withCredentials: true }); */
    const responseData = response.data;

    return responseData;
  } catch (error) {
    console.error('Hubo un error al realizar la solicitud:', error);
    throw error;
  }
}