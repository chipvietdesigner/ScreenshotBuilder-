import React from 'react';
import { Settings, Bell, ChevronRight, User, Shield, CreditCard } from 'lucide-react';

export const Screen2_Account: React.FC = () => {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-[#F38B1C] p-6 pb-12 pt-8 text-white rounded-b-[2.5rem] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Settings size={24} />
          <Bell size={24} />
        </div>
        <div className="flex items-center gap-4">
          <img src="https://picsum.photos/100/100" alt="Profile" className="w-16 h-16 rounded-full border-2 border-white" />
          <div>
            <h2 className="text-xl font-bold">Abdoulaye Diallo</h2>
            <p className="text-white/80 text-sm">+221 77 123 45 67</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">CFA 145.500</p>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Add
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2">
                <p className="text-xs text-gray-500">Expenses (Month)</p>
                <p className="font-bold text-red-500">- CFA 12.000</p>
            </div>
             <div className="text-center p-2 border-l border-gray-100">
                <p className="text-xs text-gray-500">Income (Month)</p>
                <p className="font-bold text-green-500">+ CFA 50.000</p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-3 px-1">Account Settings</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {[
            { icon: User, label: "Personal Information" },
            { icon: Shield, label: "Security and Privacy" },
            { icon: CreditCard, label: "Payment Methods" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 active:bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <item.icon size={16} />
                </div>
                <span className="font-medium text-gray-800">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};