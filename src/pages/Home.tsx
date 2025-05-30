import React from 'react';
import Counter from '../components/Counter';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCounterSubmit = (flex: number, gestionPost: number) => {
    navigate('/entrega', { state: { flex, gestionPost } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-secondary-900 mb-4">
            Sistema de Gestión de Paquetes
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Registre y controle la entrega de paquetes FLEX y GestionPost de manera eficiente
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Contador de Paquetes
              </h2>
              <div className="bg-secondary-50 rounded-xl p-6">
                <Counter onSubmit={handleCounterSubmit} />
              </div>
            </div>

            <div className="border-t border-secondary-200 pt-8">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Instrucciones
              </h3>
              <ul className="space-y-4 text-secondary-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Utilice los botones <span className="font-medium">+</span> y <span className="font-medium">-</span> para ajustar la cantidad de paquetes de cada tipo</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Una vez ingresadas las cantidades correctas, haga clic en <span className="font-medium">Continuar</span></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Complete el formulario de entrega con los datos del cadete y su firma</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
