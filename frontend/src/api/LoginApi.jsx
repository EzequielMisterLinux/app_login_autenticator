import axios from 'axios';

const globalUrl = "http://localhost:3000/api";

const Login = async (email, password) => {
  try {
    const response = await axios.post(
      `${globalUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
    
    sessionStorage.setItem('user', JSON.stringify({
      username: response.data.username,
      name: response.data.name,
      email: response.data.email,
      image: response.data.image
    }));
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

export default Login;