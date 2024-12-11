import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { Download, FilePlus2, User, FileText } from 'lucide-react';


const initialData = {
  users: [
    {
      id: 1,
      name: 'Admin Usuario',
      email: 'admin@contadorcito.com',
      role: 'Administrador'
    },
    {
      id: 2,
      name: 'Auxiliar Contable',
      email: 'auxiliar@contadorcito.com',
      role: 'Auxiliar de Contabilidad'
    }
  ],
  empresas: [
    {
      id: 1,
      nombre: 'Empresa ABC',
      tipo: 'Jurídica',
      direccion: 'Av. Principal 123',
      telefono: '2222-3333',
      correo: 'contacto@empresaabc.com',
      comprobantesCompras: [
        {
          id: 1,
          tipoComprobante: 'Crédito Fiscal',
          numeroComprobante: 'CC-001',
          fecha: '2024-10-15',
          monto: 5000.00,
          proveedor: 'Proveedor XYZ',
          archivoPdf: null,
          archivoJson: null
        }
      ],
      comprobantesVentas: [
        {
          id: 1,
          tipoComprobante: 'Crédito Fiscal',
          numeroComprobante: 'CV-001',
          fecha: '2024-10-20',
          monto: 7500.00,
          cliente: 'Cliente Principal',
          archivoPdf: null,
          archivoJson: null
        }
      ]
    }
  ]
};

export default function UserDashboard() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(initialData.users[0]);
  const [empresas, setEmpresas] = useState(initialData.empresas);
  const [modalType, setModalType] = useState(null);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  // Modal handlers
  const openModal = (type, empresa = null) => {
    setModalType(type);
    setSelectedEmpresa(empresa);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedEmpresa(null);
  };

  // Add new enterprise
  const agregarEmpresa = (nuevaEmpresa) => {
    const empresaConEstructura = {
      ...nuevaEmpresa,
      id: empresas.length + 1,
      comprobantesCompras: [],
      comprobantesVentas: []
    };
    setEmpresas([...empresas, empresaConEstructura]);
    closeModal();
  };

  // Add purchase or sales receipt
  const agregarComprobante = (tipo, comprobante) => {
    const empresaActualizada = empresas.map(empresa => {
      if (empresa.id === selectedEmpresa.id) {
        const nuevoComprobante = {
          ...comprobante,
          id: empresa[`comprobantes${tipo}`].length + 1
        };
        return {
          ...empresa,
          [`comprobantes${tipo}`]: [...empresa[`comprobantes${tipo}`], nuevoComprobante]
        };
      }
      return empresa;
    });

    setEmpresas(empresaActualizada);
    closeModal();
  };

  // Export report
  const exportarReporte = (empresa, tipoComprobante, fechaInicio, fechaFin, formato) => {
    // Simulated export functionality
    const comprobantes = empresa[`comprobantes${tipoComprobante}`].filter(
      comp => comp.fecha >= fechaInicio && comp.fecha <= fechaFin
    );

    console.log(`Exportando reporte de ${tipoComprobante} para ${empresa.nombre}`, {
      formato,
      fechaInicio,
      fechaFin,
      comprobantes
    });

    // In a real app, this would trigger actual file download
    alert(`Reporte generado para ${empresa.nombre}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header/>

      <main className="container mx-auto p-6">
        {/* Empresas Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold text-cyberpunk-pink">Empresas</h2>
            {currentUser.role === 'Administrador' && (
              <button 
                onClick={() => openModal('agregarEmpresa')}
                className="bg-cyberpunk-blue px-4 py-2 rounded flex items-center"
              >
                <FilePlus2 className="mr-2" /> Agregar Empresa
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {empresas.map(empresa => (
              <div key={empresa.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{empresa.nombre}</h3>
                <p>Tipo: {empresa.tipo}</p>
                <p>Contacto: {empresa.telefono}</p>
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => openModal('agregarCompraVenta', empresa)}
                    className="bg-cyberpunk-blue px-3 py-1 rounded"
                  >
                    Agregar Comprobante
                  </button>
                  <button 
                    onClick={() => openModal('generarReporte', empresa)}
                    className="bg-cyberpunk-pink px-3 py-1 rounded flex items-center"
                  >
                    <FileText className="mr-1" /> Generar Reporte
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      {modalType === 'agregarEmpresa' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Agregar Nueva Empresa</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              agregarEmpresa({
                nombre: formData.get('nombre'),
                tipo: formData.get('tipo'),
                direccion: formData.get('direccion'),
                telefono: formData.get('telefono'),
                correo: formData.get('correo')
              });
            }}>
              {/* Form inputs similar to previous implementation */}
              <div className="flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-cyberpunk-blue rounded"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'agregarCompraVenta' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Agregar Comprobante para {selectedEmpresa.nombre}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const tipoComprobante = formData.get('tipoComprobante');
              
              agregarComprobante(tipoComprobante, {
                tipoComprobante: formData.get('tipo'),
                numeroComprobante: formData.get('numero'),
                fecha: formData.get('fecha'),
                monto: parseFloat(formData.get('monto')),
                [tipoComprobante === 'Compras' ? 'proveedor' : 'cliente']: formData.get('entidad'),
                archivoPdf: null,
                archivoJson: null
              });
            }}>
              <select 
                name="tipoComprobante" 
                className="w-full p-2 mb-2 bg-gray-700 rounded"
                required
              >
                <option value="">Seleccionar Tipo de Comprobante</option>
                <option value="Compras">Comprobantes de Compras</option>
                <option value="Ventas">Comprobantes de Ventas</option>
              </select>
              
              <select 
                name="tipo" 
                className="w-full p-2 mb-2 bg-gray-700 rounded"
                required
              >
                <option value="">Tipo de Comprobante</option>
                <option value="Crédito Fiscal">Crédito Fiscal</option>
                <option value="Consumidor Final">Consumidor Final</option>
              </select>

              <input 
                name="numero" 
                placeholder="Número de Comprobante" 
                className="w-full p-2 mb-2 bg-gray-700 rounded" 
                required 
              />
              
              <input 
                name="fecha" 
                type="date" 
                className="w-full p-2 mb-2 bg-gray-700 rounded" 
                required 
              />
              
              <input 
                name="monto" 
                type="number" 
                step="0.01" 
                placeholder="Monto" 
                className="w-full p-2 mb-2 bg-gray-700 rounded" 
                required 
              />
              
              <input 
                name="entidad" 
                placeholder="Proveedor/Cliente" 
                className="w-full p-2 mb-2 bg-gray-700 rounded" 
                required 
              />

              <div className="flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-cyberpunk-blue rounded"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'generarReporte' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Generar Reporte para {selectedEmpresa.nombre}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              exportarReporte(
                selectedEmpresa, 
                formData.get('tipoComprobante'),
                formData.get('fechaInicio'),
                formData.get('fechaFin'),
                formData.get('formato')
              );
            }}>
              <select 
                name="tipoComprobante" 
                className="w-full p-2 mb-2 bg-gray-700 rounded"
                required
              >
                <option value="">Seleccionar Tipo de Comprobante</option>
                <option value="Compras">Comprobantes de Compras</option>
                <option value="Ventas">Comprobantes de Ventas</option>
              </select>

              <div className="flex space-x-2 mb-2">
                <div className="w-1/2">
                  <label className="block mb-1">Fecha Inicio</label>
                  <input 
                    name="fechaInicio" 
                    type="date" 
                    className="w-full p-2 bg-gray-700 rounded" 
                    required 
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1">Fecha Fin</label>
                  <input 
                    name="fechaFin" 
                    type="date" 
                    className="w-full p-2 bg-gray-700 rounded" 
                    required 
                  />
                </div>
              </div>

              <select 
                name="formato" 
                className="w-full p-2 mb-2 bg-gray-700 rounded"
                required
              >
                <option value="">Formato de Exportación</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-cyberpunk-blue rounded flex items-center"
                >
                  <Download className="mr-2" /> Generar Reporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>)
}


