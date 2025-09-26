import React from 'react';
import { Users, FolderOpen, Award, Eye } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import { LineChart, DonutChart } from '../components/Dashboard/Chart';
import { dashboardStats, chartData } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Visitors"
          value={dashboardStats.totalVisitors}
          change="+12.5% from last month"
          changeType="increase"
          icon={Eye}
          color="blue"
        />
        <StatsCard
          title="Projects"
          value={dashboardStats.totalProjects}
          change="+3 new this month"
          changeType="increase"
          icon={FolderOpen}
          color="green"
        />
        <StatsCard
          title="Clients"
          value={dashboardStats.totalClients}
          change="+8.2% from last month"
          changeType="increase"
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Achievements"
          value={dashboardStats.totalAchievements}
          change="+2 this quarter"
          changeType="increase"
          icon={Award}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart data={chartData.visitors} title="Visitors This Week" />
        <DonutChart data={chartData.engagement} title="Page Engagement" />
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { action: 'New project "E-commerce Dashboard" added', time: '2 hours ago', type: 'project' },
            { action: 'User "Sarah Wilson" updated profile', time: '4 hours ago', type: 'user' },
            { action: 'New message from "Alex Thompson"', time: '6 hours ago', type: 'message' },
            { action: 'Achievement "Best Developer Award" published', time: '1 day ago', type: 'achievement' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-200">{activity.action}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}