import React from 'react';

const colorClasses = {
  blue: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
  green: 'bg-green-600/20 text-green-400 border-green-500/30',
  purple: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
  orange: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
};

const changeClasses = {
  increase: 'text-green-400',
  decrease: 'text-red-400',
};

export default function StatsCard({ title, value, change, changeType, icon: Icon, color }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className={`text-sm mt-2 ${changeClasses[changeType]}`}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}