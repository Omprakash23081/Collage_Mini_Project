import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { success, message } = await login(email, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError(message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 font-sans relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-600/20 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] opacity-40"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 mt-2 text-sm"
          >
            Sign in to access the admin functionality
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, h: 0 }}
                animate={{ opacity: 1, h: "auto" }}
                exit={{ opacity: 0, h: 0 }}
                className="bg-red-500/10 text-red-500 px-4 py-3 rounded-xl text-sm border border-red-500/20 flex items-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="group">
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-500 transition-colors">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500/50 outline-none transition-all text-zinc-200 placeholder-zinc-500 font-medium"
                  placeholder="admin@college.edu"
                  required
                />
              </div>
            </div>

            <div className="group">
                <label className="block text-xs font-semibold text-zinc-500 mb-1.5 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-500 transition-colors">
                  <Lock size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500/50 outline-none transition-all text-zinc-200 placeholder-zinc-500 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
