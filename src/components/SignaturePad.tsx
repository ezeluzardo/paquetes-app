import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSignatureChange: (signature: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSignatureChange }) => {
  const signaturePadRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      onSignatureChange('');
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current) {
      const signatureData = signaturePadRef.current.toDataURL();
      onSignatureChange(signatureData);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="border-2 border-gray-300 rounded-lg w-full">
        <SignatureCanvas
          ref={signaturePadRef}
          canvasProps={{
            className: 'w-full h-48',
          }}
          onEnd={handleSave}
        />
      </div>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Borrar Firma
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
