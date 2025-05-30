import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignaturePad from '../components/SignaturePad';
import { PackageCount, DeliveryFormData } from '../types';

const Entrega: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageCounts = location.state as PackageCount;
  const total = packageCounts.flex + packageCounts.gestionPost;

  const [formData, setFormData] = useState<DeliveryFormData>({
    courierName: '',
    dateTime: new Date().toISOString().slice(0, 16),
    flexCount: packageCounts.flex,
    gestionPostCount: packageCounts.gestionPost,
    total,
    signature: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.signature) {
      setError('Por favor, agregue su firma');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/submit-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Error al enviar los datos. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Formulario de Entrega
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre y Apellido del Cadete
              </label>
              <input
                type="text"
                required
                value={formData.courierName}
                onChange={(e) => setFormData({ ...formData, courierName: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                value={formData.dateTime}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paquetes FLEX
                </label>
                <input
                  type="number"
                  value={formData.flexCount}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paquetes GestionPost
                </label>
                <input
                  type="number"
                  value={formData.gestionPostCount}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total de Paquetes
              </label>
              <input
                type="number"
                value={formData.total}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firma del Cadete
              </label>
              <SignaturePad
                onSignatureChange={(signature) => setFormData({ ...formData, signature })}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium">{error}</div>
            )}

            {success && (
              <div className="text-green-600 text-sm font-medium">
                ¡Datos enviados correctamente! Redirigiendo...
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold
                ${isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar a Google Sheets'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Entrega;
