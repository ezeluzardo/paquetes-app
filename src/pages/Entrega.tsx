import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignaturePad from '../components/SignaturePad';
import Button from '../components/Button';
import Input from '../components/Input';

interface PackageCount {
  flex: number;
  gestionPost: number;
}

interface DeliveryFormData {
  courierName: string;
  dateTime: string;
  flexCount: number;
  gestionPostCount: number;
  total: number;
  signature: string;
}

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
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.signature) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor, agregue su firma'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

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

      setSubmitStatus({
        type: 'success',
        message: '¡Datos enviados con éxito! Redirigiendo...'
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Error al enviar los datos. Por favor, intente nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
            Formulario de Entrega
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600">
            Complete los datos para registrar la entrega
          </p>
        </div>

        {submitStatus.type && (
          <div
            className={`rounded-md p-4 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
            role="alert"
          >
            <p className="text-sm font-medium">{submitStatus.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 shadow-soft rounded-xl">
          <div className="space-y-4">
            <Input
              label="Nombre del Cadete"
              type="text"
              value={formData.courierName}
              onChange={(e) => setFormData({ ...formData, courierName: e.target.value })}
              required
              placeholder="Ingrese nombre del cadete"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Paquetes FLEX"
                type="number"
                value={formData.flexCount}
                readOnly
                className="bg-gray-50"
              />
              <Input
                label="Paquetes GestionPost"
                type="number"
                value={formData.gestionPostCount}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <Input
              label="Total de Paquetes"
              type="number"
              value={formData.total}
              readOnly
              className="bg-gray-50"
            />

            <Input
              label="Fecha y Hora"
              type="datetime-local"
              value={formData.dateTime}
              readOnly
              className="bg-gray-50"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">
                Firma
              </label>
              <div className="mt-1 border border-secondary-300 rounded-lg overflow-hidden">
                <SignaturePad
                  onSignatureChange={(signature) =>
                    setFormData({ ...formData, signature })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Entrega;
