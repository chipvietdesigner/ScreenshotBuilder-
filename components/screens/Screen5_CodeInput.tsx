import React from 'react';
import { X, UserPlus } from 'lucide-react';

export const Screen5_CodeInput: React.FC = () => {
  return (
    <div className="h-full bg-white flex flex-col p-6">
      <div className="flex justify-between items-center mb-12">
        <X className="text-gray-800" size={24} />
      </div>

      <div className="flex flex-col items-center flex-1">
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-yellow-100">
            <UserPlus className="text-white" size={40} fill="white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            You're almost there!
        </h1>
        
        <p className="text-gray-600 text-center mb-8 px-2 text-sm leading-relaxed">
            To start using Cashless Schools, please enter the invitation code provided by the administrator or the main parent.
        </p>
        
        <p className="text-sm font-medium text-gray-800 mb-4">
            Enter your invitation code below
        </p>

        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 flex justify-between items-center px-8 mb-8">
            {['S', 'G', '1', '2', '3', '4'].map((char, i) => (
                <span key={i} className="text-2xl font-bold text-gray-800 font-mono">
                    {char}
                </span>
            ))}
        </div>

        <div className="mt-auto w-full pb-8">
             <button className="w-full bg-[#DC2626] text-white font-bold py-4 rounded-full shadow-xl shadow-red-100">
                CONTINUE
            </button>
        </div>
      </div>
    </div>
  );
};