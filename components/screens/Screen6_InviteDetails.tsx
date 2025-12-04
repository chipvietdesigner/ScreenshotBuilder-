import React from 'react';
import { X, Mail, Phone, MapPin } from 'lucide-react';

export const Screen6_InviteDetails: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center text-yellow-500">
           <Mail size={24} fill="#EAB308" className="text-yellow-500"/>
        </div>
        <X className="text-gray-400" size={24} />
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
        John Ngoy has invited you to be a Secondary Guardian for Jean Illunga.
      </h1>

      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        By accepting this invitation, you will have access to view and support this student.
      </p>

      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Profile</p>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-lg mb-2">John Ngoy</h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <Phone size={14} /> +256 123456789
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Mail size={14} /> john.ngoy@gmail.com
        </div>
      </div>

      <div className="flex justify-center -my-3 z-10 relative">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border-2 border-white">
              Brother-in-law (Relation)
          </span>
      </div>

      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Student Profile</p>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex mb-8">
        <img src="https://picsum.photos/300/400" className="w-1/3 object-cover" alt="Student" />
        <div className="p-4 flex-1">
            <div className="mb-3">
                <span className="text-xs text-gray-400 block">Full Name</span>
                <span className="font-bold text-gray-900">Jean Illunga</span>
            </div>
            <div className="mb-3">
                <span className="text-xs text-gray-400 block">Date of Birth</span>
                <span className="font-medium text-gray-800">02/10/2015</span>
            </div>
            <div>
                 <span className="text-xs text-gray-400 block">School</span>
                 <span className="font-bold text-gray-900 text-sm">Kampala Int. School</span>
            </div>
        </div>
      </div>

      <div className="flex gap-4 mt-auto">
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-full">
            DECLINE
        </button>
        <button className="flex-1 bg-[#DC2626] text-white font-bold py-3 rounded-full shadow-lg shadow-red-100">
            ACCEPT
        </button>
      </div>
    </div>
  );
};