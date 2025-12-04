import React from 'react';
import { ArrowLeft, SlidersHorizontal, Search } from 'lucide-react';

export const Screen7_Transactions: React.FC = () => {
    const transactions = [
        { name: "Fund Top-up", type: "Success", amount: "+CFA 1,000", time: "13:00", img: "https://picsum.photos/50/50" },
        { name: "Fund Withdrawal", type: "Success", amount: "+CFA 1,000", time: "13:00", img: "https://picsum.photos/51/51" },
        { name: "Withdrawal", type: "Success", amount: "-CFA 1,000", time: "13:00", img: "https://picsum.photos/52/52" },
        { name: "Payment", type: "Success", amount: "-CFA 1,000", time: "13:00", img: "https://picsum.photos/53/53" },
        { name: "Wallet Top-up", type: "Success", amount: "+CFA 1,000", time: "13:00", img: "https://picsum.photos/54/54" },
    ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <ArrowLeft size={24} className="text-gray-800" />
        <h1 className="text-lg font-bold">Transactions</h1>
        <SlidersHorizontal size={24} className="text-gray-800" />
      </div>

      <div className="p-4">
        {/* Avatars Filter Row */}
        <div className="flex justify-between mb-6 px-2">
            <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-[#F38B1C] flex items-center justify-center text-white font-bold text-xs">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z"/></svg>
                </div>
                <span className="text-xs font-medium">All</span>
            </div>
            {['You', 'Diallo', 'Awa', 'Faye'].map((name, i) => (
                 <div key={i} className="flex flex-col items-center gap-1 opacity-50">
                    <img src={`https://picsum.photos/5${i}/5${i}`} className="w-12 h-12 rounded-full border border-gray-200" alt={name} />
                    <span className="text-xs font-medium">{name}</span>
                </div>
            ))}
        </div>

        <h3 className="text-sm font-bold text-gray-500 mb-4 px-2">Today</h3>
        
        <div className="space-y-6">
            {transactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <img src={tx.img} className="w-10 h-10 rounded-full" alt="" />
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{tx.name}</p>
                            <p className="text-xs text-gray-400">{tx.time}</p>
                        </div>
                    </div>
                    <div className="text-right">
                         <p className={`font-bold text-sm ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>{tx.amount}</p>
                         <p className="text-xs text-green-500">{tx.type}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};