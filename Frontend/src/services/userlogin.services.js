import axios from 'axios';
import qs from 'qs'

export async function userLogin(mail, password) {
  const url = 'http://localhost:3000/api/users/login';

  let data = qs.stringify({
    'email': mail,
    'password': password
  });
  
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
userLogin('loki@gmail.com','Lucas2024')
  .then((response) =>{
    console.log(response);
  })
