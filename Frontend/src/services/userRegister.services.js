import axios from 'axios';
import qs from 'qs'

export async function userRegister(firstName, lastName, userName, email, password, password2) {

  const url = 'http://localhost:3000/api/users/register';
  let data = {
    firstName,
    lastName,
    userName,
    email,
    password,
    password2
  }
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const response = await axios.post(url, data, config);
    const responseData = response.data;

    return responseData;
  } catch (error) {
    console.error('Hubo un error al realizar la solicitud:', error);
    throw error;
  }
}
