import React from 'react';
import { PieChart, ArrowDownRight, ArrowUpRight, Calendar } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

export const Screen8_Spending: React.FC = () => {
    const data = [
      { name: 'Mon', amt: 2400 },
      { name: 'Tue', amt: 1398 },
      { name: 'Wed', amt: 9800 },
      { name: 'Thu', amt: 3908 },
      { name: 'Fri', amt: 4800 },
      { name: 'Sat', amt: 3800 },
      { name: 'Sun', amt: 4300 },
    ];

  return (
    <div className="h-full bg-white flex flex-col">
       <div className="p-6 bg-gray-900 text-white rounded-b-3xl pb-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Overview</h1>
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                    <Calendar size={20} />
                </div>
            </div>
            
            <div className="flex flex-col items-center mb-4">
                <span className="text-gray-400 text-sm mb-1">Total Expenses (Week)</span>
                <span className="text-3xl font-bold">CFA 45.200</span>
            </div>

             <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                    <div className="bg-green-500/20 p-1.5 rounded-full text-green-400">
                        <ArrowDownRight size={16} />
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block">Income</span>
                        <span className="font-bold text-sm">24.000</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-red-500/20 p-1.5 rounded-full text-red-400">
                        <ArrowUpRight size={16} />
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block">Expenses</span>
                        <span className="font-bold text-sm">12.500</span>
                    </div>
                </div>
            </div>
       </div>

       <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-6">Weekly Activity</h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                        <Tooltip 
                            cursor={{fill: '#f3f4f6'}} 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                        />
                        <Bar dataKey="amt" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 2 ? '#F38B1C' : '#E5E7EB'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <h3 className="font-bold text-gray-900 mb-4 mt-6">Top Categories</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                            <PieChart size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-sm">School Canteen</div>
                            <div className="text-xs text-gray-500">24 Transactions</div>
                        </div>
                    </div>
                    <span className="font-bold text-gray-900">45%</span>
                </div>
                <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                            <PieChart size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-sm">Transport</div>
                            <div className="text-xs text-gray-500">12 Transactions</div>
                        </div>
                    </div>
                    <span className="font-bold text-gray-900">30%</span>
                </div>
            </div>
       </div>
    </div>
  );
};