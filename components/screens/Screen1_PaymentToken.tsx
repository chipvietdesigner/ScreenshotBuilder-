import React from 'react';
import { Wifi, Wallet, CreditCard } from 'lucide-react';

export const Screen1_PaymentToken: React.FC = () => {
  return (
    <div className="h-full bg-white flex flex-col p-6">
      <div className="mb-8 mt-2">
        <h1 className="text-2xl font-bold text-gray-900">Hello, Abdoulaye</h1>
        <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Wallet: 324124546362453
        </div>
      </div>

      {/* The Payment Card */}
      <div className="relative w-full aspect-[1.58] bg-gradient-to-br from-[#F38B1C] to-[#e07a0b] rounded-2xl p-6 text-white shadow-lg transform transition-transform hover:scale-105">
        <div className="flex justify-between items-start mb-8">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
             <Wifi className="w-6 h-6 rotate-90" />
          </div>
          <CreditCard className="w-8 h-8 text-white/80" />
        </div>
        <div className="mt-auto">
          <div className="text-xs uppercase opacity-80 mb-1">Current Balance</div>
          <div className="text-3xl font-bold">CFA 25.000</div>
          <div className="mt-4 flex justify-between items-center text-sm opacity-90">
             <span>**** **** **** 8844</span>
             <span>12/26</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-orange-100 text-[#F38B1C] rounded-full flex items-center justify-center">
            <Wallet size={20} />
          </div>
          <span className="text-sm font-medium text-gray-700">Top up</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-100 shadow-sm">
           <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
            <CreditCard size={20} />
          </div>
          <span className="text-sm font-medium text-gray-700">Manage Card</span>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Active Wearables</h3>
        <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F38B1C" strokeWidth="2" className="w-6 h-6">
                    <circle cx="12" cy="12" r="7" />
                    <path d="M12 12v-3" />
                </svg>
            </div>
            <div>
                <div className="font-bold text-gray-800">Mamadou's Wearable</div>
                <div className="text-xs text-green-600 font-medium">Active • NFC Enabled</div>
            </div>
        </div>
      </div>
    </div>
  );
};