import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Counter from '../components/Counter';
import { PackageCount } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [packageCounts, setPackageCounts] = useState<PackageCount>({
    flex: 0,
    gestionPost: 0,
  });

  const handleIncrement = (type: keyof PackageCount) => {
    setPackageCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type: keyof PackageCount) => {
    setPackageCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1),
    }));
  };

  const total = packageCounts.flex + packageCounts.gestionPost;

  const handleConfirm = () => {
    navigate('/entrega', { state: packageCounts });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Control de Paquetes
        </h1>
        <div className="space-y-6">
          <Counter
            label="Paquetes FLEX"
            value={packageCounts.flex}
            onIncrement={() => handleIncrement('flex')}
            onDecrement={() => handleDecrement('flex')}
          />
          <Counter
            label="Paquetes GestionPost"
            value={packageCounts.gestionPost}
            onIncrement={() => handleIncrement('gestionPost')}
            onDecrement={() => handleDecrement('gestionPost')}
          />
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">Total de Paquetes</h3>
            <p className="text-3xl font-bold text-blue-600">{total}</p>
          </div>
          <button
            onClick={handleConfirm}
            disabled={total === 0}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold text-lg
              ${total === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Confirmar Entrega de Paquetes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
