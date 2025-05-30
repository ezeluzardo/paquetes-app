import React, { useState } from 'react';
import Button from './Button';

interface CounterProps {
  onSubmit: (flex: number, gestionPost: number) => void;
}

const Counter: React.FC<CounterProps> = ({ onSubmit }) => {
  const [counts, setCounts] = useState({
    flex: 0,
    gestionPost: 0
  });

  const handleIncrement = (type: 'flex' | 'gestionPost') => {
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const handleDecrement = (type: 'flex' | 'gestionPost') => {
    setCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1)
    }));
  };

  const total = counts.flex + counts.gestionPost;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Paquetes FLEX</h3>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleDecrement('flex')}
              className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 text-xl font-bold hover:bg-secondary-200 transition-colors"
            >
              -
            </button>
            <span className="text-3xl font-bold text-secondary-900">{counts.flex}</span>
            <button
              onClick={() => handleIncrement('flex')}
              className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold hover:bg-primary-200 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Paquetes GestionPost</h3>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleDecrement('gestionPost')}
              className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 text-xl font-bold hover:bg-secondary-200 transition-colors"
            >
              -
            </button>
            <span className="text-3xl font-bold text-secondary-900">{counts.gestionPost}</span>
            <button
              onClick={() => handleIncrement('gestionPost')}
              className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold hover:bg-primary-200 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="bg-white px-6 py-4 rounded-lg shadow-soft inline-block">
          <p className="text-lg text-secondary-600">Total de paquetes:</p>
          <p className="text-4xl font-bold text-primary-600">{total}</p>
        </div>

        <div>
          <Button
            onClick={() => onSubmit(counts.flex, counts.gestionPost)}
            disabled={total === 0}
            size="lg"
            className="w-full md:w-auto"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
