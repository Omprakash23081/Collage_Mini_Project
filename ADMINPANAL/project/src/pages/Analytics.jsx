import React from 'react';
import { TrendingUp, Eye, MousePointer, Clock } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import { LineChart, DonutChart } from '../components/Dashboard/Chart';
import { chartData } from '../data/mockData';

export default function Analytics() {
  const analyticsData = {
    pageViews: [
      { name: 'Jan', visitors: 2400 },
      { name: 'Feb', visitors: 1398 },
      { name: 'Mar', visitors: 9800 },
      { name: 'Apr', visitors: 3908 },
      { name: 'May', visitors: 4800 },
      { name: 'Jun', visitors: 3800 },
    ],
    topPages: [
      { name: 'Home', value: 45 },
      { name: 'Projects', value: 25 },
      { name: 'About', value: 20 },
      { name: 'Contact', value: 10 },
    ],
    devices: [
      { name: 'Desktop', value: 60 },
      { name: 'Mobile', value: 35 },
      { name: 'Tablet', value: 5 },
    ]
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-gray-400">
          Track your portfolio performance and user engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Page Views"
          value="24,567"
          change="+12% from last month"
          changeType="increase"
          icon={Eye}
          color="blue"
        />
        <StatsCard
          title="Unique Visitors"
          value="8,234"
          change="+8% from last month"
          changeType="increase"
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Avg. Session"
          value="3m 42s"
          change="+15s from last month"
          changeType="increase"
          icon={Clock}
          color="purple"
        />
        <StatsCard
          title="Click Rate"
          value="2.4%"
          change="+0.3% from last month"
          changeType="increase"
          icon={MousePointer}
          color="orange"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart data={analyticsData.pageViews} title="Page Views Over Time" />
        <DonutChart data={analyticsData.topPages} title="Top Pages" />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutChart data={analyticsData.devices} title="Device Usage" />
        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { source: 'Direct', percentage: 45, color: 'bg-blue-500' },
              { source: 'Google Search', percentage: 30, color: 'bg-green-500' },
              { source: 'Social Media', percentage: 15, color: 'bg-purple-500' },
              { source: 'Referrals', percentage: 10, color: 'bg-orange-500' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-gray-200">{item.source}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 h-2 bg-gray-600 rounded-full">
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Content */}
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Most Viewed Content</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { title: 'Portfolio Showcase Video', views: 1250, type: 'Video' },
              { title: 'Web Development Service', views: 890, type: 'Service' },
              { title: 'UI/UX Design Process', views: 750, type: 'Project' },
              { title: 'About Me Section', views: 650, type: 'Page' },
              { title: 'Contact Form', views: 580, type: 'Page' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{item.views.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}