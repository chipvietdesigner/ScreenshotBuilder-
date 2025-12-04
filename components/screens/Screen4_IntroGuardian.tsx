import React from 'react';
import { Users, ShieldCheck, ArrowRight } from 'lucide-react';

export const Screen4_IntroGuardian: React.FC = () => {
  return (
    <div className="h-full bg-white flex flex-col p-8 items-center justify-center text-center relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-orange-50 -z-10 rounded-b-[40%] scale-150 translate-y-[-20%]"></div>

      <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 relative">
        <Users size={48} className="text-[#F38B1C]" />
        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-white">
            <ShieldCheck size={20} />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Invite a Secondary Guardian
      </h1>
      
      <p className="text-gray-500 mb-8 leading-relaxed">
        Share the responsibility. Allow another family member to top up the account and track expenses.
      </p>

      <div className="w-full space-y-4">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                1
            </div>
            <div className="text-sm">
                <span className="font-bold block text-gray-800">Generate a code</span>
                <span className="text-gray-500">Create a unique invitation code from the student's profile.</span>
            </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                2
            </div>
             <div className="text-sm">
                <span className="font-bold block text-gray-800">Share it</span>
                <span className="text-gray-500">Send the code to your spouse or a trusted relative.</span>
            </div>
        </div>
      </div>

      <button className="mt-12 bg-[#F38B1C] text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200">
        Get Started <ArrowRight size={20} />
      </button>

    </div>
  );
};