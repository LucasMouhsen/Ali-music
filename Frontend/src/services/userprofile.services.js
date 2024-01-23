import axios from 'axios';

export async function userProfile() {
  const url = 'http://localhost:3000/api/users/profile';

  try {
    const response = await axios.get(url, { withCredentials: true });
    const responseData = response.data;

    return responseData;
  } catch (error) {
    console.error('Hubo un error al realizar la solicitud:', error);
    throw error;
  }
}

userProfile()
  .then((response)=> {
    console.log(response);
  })
  .catch((error) => {
    console.error('Hubo un error:', error);
  });
