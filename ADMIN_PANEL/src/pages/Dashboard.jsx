import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Users, FileText, Calendar, TrendingUp, FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-zinc-900 p-6 rounded-2xl shadow-sm border border-white/5 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={64} className="text-white" />
    </div>
    <div className="flex items-start justify-between relative z-10">
      <div>
        <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm relative z-10">
      <span className="text-green-500 font-medium flex items-center gap-1">
        <TrendingUp size={16} /> +2.5%
      </span>
      <span className="text-zinc-500 ml-2">from last month</span>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  
  const [statsData, setStatsData] = useState({
    users: 0,
    notes: 0,
    events: 0,
    pyqs: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await Promise.allSettled([
            api.get('/users/getallusers'),
            api.get('/notes'),
            api.get('/events'),
            api.get('/pyq')
        ]);

        const [usersRes, notesRes, eventsRes, pyqsRes] = results;

        setStatsData({
            users: usersRes.status === 'fulfilled' ? (usersRes.value.data?.data?.length || 0) : 0,
            notes: notesRes.status === 'fulfilled' ? (notesRes.value.data?.data?.length || 0) : 0,
            events: eventsRes.status === 'fulfilled' ? (eventsRes.value.data?.data?.length || 0) : 0,
            pyqs: pyqsRes.status === 'fulfilled' ? (pyqsRes.value.data?.data?.length || 0) : 0
        });
        
        // Log errors if any
        if (results.some(r => r.status === 'rejected')) {
            console.error("Some dashboard stats failed to load:", results.filter(r => r.status === 'rejected'));
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { title: "Total Users", value: statsData.users, icon: Users, color: "bg-blue-600" },
    { title: "Notes Uploaded", value: statsData.notes, icon: FileText, color: "bg-indigo-600" },
    { title: "Active Events", value: statsData.events, icon: Calendar, color: "bg-violet-600" },
    { title: "Total PYQs", value: statsData.pyqs, icon: FileQuestion, color: "bg-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900 p-6 rounded-2xl shadow-sm border border-white/5 h-96"
        >
            <h2 className="text-lg font-bold text-zinc-100 mb-4">Recent Activity</h2>
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm border-2 border-dashed border-zinc-800 rounded-xl">
                Chart Placeholder
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900 p-6 rounded-2xl shadow-sm border border-white/5 h-96"
        >
            <h2 className="text-lg font-bold text-zinc-100 mb-4">Storage Usage</h2>
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm border-2 border-dashed border-zinc-800 rounded-xl">
                Pie Chart Placeholder
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
