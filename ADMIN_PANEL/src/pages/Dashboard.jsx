import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Users, FileText, Calendar, TrendingUp, FileQuestion, Activity, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay, subtext }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-zinc-900 p-6 rounded-2xl shadow-sm border border-white/5 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color.replace('bg-', 'text-')}`}>
        <Icon size={80} />
    </div>
    <div className="flex items-start justify-between relative z-10">
      <div>
        <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/5`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm relative z-10">
      {subtext && <span className="text-zinc-500">{subtext}</span>}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
      return <div className="p-8 text-zinc-400">Loading dashboard...</div>;
  }

  const statCards = [
    { 
        title: "Total Users", 
        value: stats?.users?.total || 0, 
        icon: Users, 
        color: "bg-blue-500",
        subtext: `${stats?.users?.active24h || 0} active in 24h`
    },
    { 
        title: "Notes", 
        value: stats?.content?.notes || 0, 
        icon: FileText, 
        color: "bg-indigo-500",
        subtext: `${stats?.content?.notesDrafts || 0} pending drafts`
    },
    { 
        title: "PYQs", 
        value: stats?.content?.pyqs || 0, 
        icon: FileQuestion, 
        color: "bg-emerald-500",
        subtext: "Exam resources"
    },
    { 
        title: "System Health", 
        value: "98%", 
        icon: Activity, 
        color: "bg-rose-500",
        subtext: "Operational"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Overview of system performance and content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Log */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl shadow-sm border border-white/5"
        >
            <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <Shield size={18} className="text-rose-500"/> 
                Admin Logs
            </h2>
            <div className="space-y-4">
                {stats?.recentLogs?.length > 0 ? (
                    stats.recentLogs.map((log) => (
                        <div key={log._id} className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-lg border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                    {log.adminId?.name?.[0] || 'A'}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-200">
                                        <span className="text-rose-400">{log.action}</span> on {log.targetCollection}
                                    </p>
                                    <p className="text-xs text-zinc-500">by {log.adminId?.name || 'Unknown'}</p>
                                </div>
                            </div>
                            <span className="text-xs text-zinc-600 font-mono">
                                {new Date(log.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-zinc-500 text-sm text-center py-8">No recent admin activity</div>
                )}
            </div>
        </motion.div>

        {/* Action Items Widget */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900 p-6 rounded-2xl shadow-sm border border-white/5"
        >
            <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500"/>
                Pending Actions
            </h2>
            <div className="space-y-3">
                {stats?.content?.notesDrafts > 0 ? (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
                         <div>
                            <p className="text-amber-200 font-medium text-sm">{stats.content.notesDrafts} Draft Notes</p>
                            <p className="text-amber-500/60 text-xs">Review and publish required</p>
                        </div>
                        <button className="text-xs bg-amber-500 text-black px-2 py-1 rounded font-bold">Review</button>
                    </div>
                ) : (
                     <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl text-center">
                        <p className="text-zinc-500 text-sm">All caught up!</p>
                     </div>
                )}
                
                 {/* Mock item for now */}
                 <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl flex items-center justify-between opacity-50">
                     <div>
                        <p className="text-zinc-400 font-medium text-sm">System Backup</p>
                        <p className="text-zinc-600 text-xs">Scheduled for midnight</p>
                    </div>
                    <span className="text-xs text-zinc-500">Auto</span>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
