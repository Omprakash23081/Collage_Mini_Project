import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()

  const chartData = [
    { name: 'Jan', value: 150 },
    { name: 'Feb', value: 230 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 270 },
    { name: 'May', value: 300 },
    { name: 'Jun', value: 350 },
  ]

  const sentimentData = [
    { name: 'Positive', value: 65 },
    { name: 'Neutral', value: 20 },
    { name: 'Negative', value: 15 },
  ]

  const colors = ['#10b981', '#6b7280', '#ef4444']

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hey, {user?.name} 👋</h1>
        <p className="text-gray-400">Welcome back to the admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm font-medium">Total Subjects</p>
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">24</p>
          <p className="text-xs text-green-400 mt-2">+3 this month</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm font-medium">Total Notes</p>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">1,240</p>
          <p className="text-xs text-green-400 mt-2">+150 this month</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm font-medium">Total PYQs</p>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <HelpCircle size={20} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">856</p>
          <p className="text-xs text-green-400 mt-2">+45 this month</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm font-medium">Active Hackathons</p>
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Trophy size={20} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">5</p>
          <p className="text-xs text-green-400 mt-2">+1 this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Unresolved Lost & Found</h3>
          <p className="text-3xl font-bold text-white mb-2">12</p>
          <p className="text-sm text-gray-400">Items waiting for resolution</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Feedback Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Positive</span>
              <span className="text-lg font-semibold text-green-400">245</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Negative</span>
              <span className="text-lg font-semibold text-red-400">48</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Faculty Members</h3>
          <p className="text-3xl font-bold text-white mb-2">28</p>
          <p className="text-sm text-gray-400">Active faculty directory</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Notes Created (Monthly)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Feedback Sentiment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {sentimentData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx] }}></div>
                <span className="text-sm text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { BookOpen, FileText, HelpCircle, Trophy } from 'lucide-react'

export default Dashboard
