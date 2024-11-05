import React, { useState } from 'react';
import Modal from 'react-modal';
import UserModal from '../modals/UserInfoModal'; // Asegúrate de que la ruta sea correcta

Modal.setAppElement('#root'); // Esto ayuda a la accesibilidad al identificar el elemento de la app principal

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">Alacrysoft Systems</h1>
      <button
        onClick={openModal}
        className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Ver Perfil
      </button>

      <UserModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </header>
  );
}
