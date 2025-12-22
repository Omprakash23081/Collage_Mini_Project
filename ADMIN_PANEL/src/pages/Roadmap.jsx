import { useState } from 'react';
import api from '../api/axios';
import { Sparkles, Map, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Roadmap = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;

    try {
      setLoading(true);
      setRoadmap(null);
      const response = await api.post('/roadmap/generate', { topic });
      if (response.data && response.data.data) {
        setRoadmap(response.data.data);
      }
    } catch (error) {
      console.error("Generator failed", error);
      alert("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-100">AI Roadmap Generator</h1>
        <p className="text-zinc-400">Generate comprehensive learning paths for any topic using Gemini AI</p>
      </div>

      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5 shadow-xl">
        <form onSubmit={handleGenerate} className="flex gap-4">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" size={20} />
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., 'Full Stack Development', 'Machine Learning')"
              className="w-full bg-zinc-950/50 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-lg"
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !topic}
            className="bg-rose-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Map />}
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </form>
      </div>

      {roadmap && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <h2 className="text-2xl font-bold text-zinc-100">{roadmap.title}</h2>
            </div>
            
            <div className="space-y-4">
                {roadmap.steps?.map((step, index) => (
                    <div key={index} className="bg-zinc-900 border border-white/5 p-6 rounded-xl hover:border-rose-500/30 transition-colors">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                                {step.stepNumber}
                            </div>
                            <div className="space-y-3 flex-1">
                                <h3 className="text-xl font-semibold text-zinc-200">{step.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                                
                                {step.topics && (
                                    <div className="flex flex-wrap gap-2">
                                        {step.topics.map((t, i) => (
                                            <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
      )}
    </div>
  );
};

export default Roadmap;
