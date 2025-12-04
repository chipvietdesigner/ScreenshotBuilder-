import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';

export const Screen3_Family: React.FC = () => {
  const familyMembers = [
    { name: "Mamadou Diallo", balance: "25.000", img: "https://picsum.photos/101/101" },
    { name: "Ibrahima Faye", balance: "10.500", img: "https://picsum.photos/102/102" },
    { name: "Awa Sow", balance: "500", img: "https://picsum.photos/103/103" },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-2xl font-bold">Family</h1>
        <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 p-6">
        <div className="space-y-4">
          {familyMembers.map((member, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={member.img} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    CFA ****** <span className="text-gray-300 ml-1">👁️</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    ≈ {member.balance} available
                  </p>
                </div>
              </div>
              <ChevronRight className="text-gray-300" />
            </div>
          ))}
          
          <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <h4 className="font-bold text-[#F38B1C] mb-1">New!</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Add a <strong>Secondary Guardian</strong> to help manage your children's accounts. Share access securely.
            </p>
            <button className="mt-3 bg-[#F38B1C] text-white text-sm font-bold py-2 px-4 rounded-lg w-full">
              Invite a guardian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};