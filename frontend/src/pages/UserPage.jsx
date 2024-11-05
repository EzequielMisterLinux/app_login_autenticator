import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function UserDashboard() {
  const { user } = useAuth();


  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-cyberpunk-pink">Dashboard de Usuario</h1>


        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-cyberpunk-blue mb-4">Bienvenido, {user?.name}</h2>
            <p className="text-gray-400">
              Aquí puedes acceder a todas las secciones y configuraciones de tu cuenta.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
