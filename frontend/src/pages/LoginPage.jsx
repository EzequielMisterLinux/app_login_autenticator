import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../api/LoginApi';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const {info, setInfo} = useState("")

  useEffect(() => {
    if (user) {
      navigate('/user');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await Login(email, pass);
      setUser(data);
      sessionStorage.setItem('user', JSON.stringify(data));
      const savedUser = sessionStorage.getItem('user');
      setUser(JSON.parse(savedUser))
      Swal.fire({
        title: "Inicio de sesion exitoso!",
        text: `bienvenido de nuevo ${user.name}`,
        icon: "success"
      }); 
      navigate('/user');
    } catch (error) {
      setError(error.message || "Contraseña o email incorrectos");
      Swal.fire({
        title: "contraseña o email incorrectos!",
        text: "verifique bien sus credenciales",
        icon: "error"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="max-w-md w-full space-y-8 bg-cyberpunk-black p-8 rounded-xl shadow-cyberpunk">
        <h2 className="text-3xl font-bold text-center text-cyberpunk-pink">
          Iniciar Sesión
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-gray-800 text-cyberpunk-blue focus:outline-none focus:ring-2 focus:ring-cyberpunk-pink"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Contraseña"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-gray-800 text-cyberpunk-blue focus:outline-none focus:ring-2 focus:ring-cyberpunk-pink"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyberpunk-pink hover:bg-cyberpunk-pink-darker transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
