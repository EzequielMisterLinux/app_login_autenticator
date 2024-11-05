import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

Modal.setAppElement('#root'); // Esto ayuda a la accesibilidad al identificar el elemento de la app principal

export default function UserModal({ isOpen, onRequestClose }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const savedUser = sessionStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [user, setUser]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      sessionStorage.removeItem('user');
      setUser(null);
      navigate('/login');
      onRequestClose(); // Cerrar el modal después de cerrar sesión
    } catch (error) {
      console.error("Error durante el logout:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-gray-800 text-white rounded-lg p-6 shadow-lg max-w-lg w-full m-auto mt-24"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
    >
      <h2 className="text-2xl font-semibold text-center text-pink-500 mb-4">Perfil de Usuario</h2>
      {user && (
        <div className="text-blue-300 space-y-2">
          {user.image && (
            <img 
              src={`http://localhost:3000/uploads/${user.image}`} 
              alt={user.name} 
              className="w-24 h-24 rounded-full object-cover mx-auto" // Estilo opcional para la imagen
            />
          )}
          <p><span className="font-bold">Nombre:</span> {user.name}</p>
          <p><span className="font-bold">Usuario:</span> {user.username}</p>
          <p><span className="font-bold">Email:</span> {user.email}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-6 w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700 transition-colors"
      >
        Cerrar Sesión
      </button>
    </Modal>
  );
}
