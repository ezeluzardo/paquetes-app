import React from 'react';

interface CounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ label, value, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{label}</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={onDecrement}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
        >
          -
        </button>
        <span className="text-2xl font-bold min-w-[3rem] text-center">{value}</span>
        <button
          onClick={onIncrement}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
