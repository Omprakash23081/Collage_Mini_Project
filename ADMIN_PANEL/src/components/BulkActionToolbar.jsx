import { Trash2, CheckCircle, XCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const BulkActionToolbar = ({ selectedCount, onClear, onAction }) => {
  if (selectedCount === 0) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 border border-white/10 rounded-full px-6 py-3 shadow-2xl z-40 flex items-center gap-6"
    >
      <div className="flex items-center gap-3 border-r border-white/10 pr-6">
        <span className="bg-rose-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {selectedCount}
        </span>
        <span className="text-zinc-300 font-medium text-sm">Selected</span>
      </div>

      <div className="flex items-center gap-2">
        <button
            onClick={() => onAction('approved')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-green-500/20 text-green-400 transition-colors text-sm font-medium"
            title="Approve Selected"
        >
            <CheckCircle size={16} />
            <span className="hidden sm:inline">Approved</span>
        </button>

        <button
            onClick={() => onAction('draft')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 text-amber-400 transition-colors text-sm font-medium"
            title="Mark as Draft"
        >
            <XCircle size={16} />
            <span className="hidden sm:inline">Draft</span>
        </button>
        
         <button
            onClick={() => onAction('premium')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-violet-500/20 text-violet-400 transition-colors text-sm font-medium"
            title="Toggle Premium"
        >
            <Shield size={16} />
            <span className="hidden sm:inline">Premium</span>
        </button>

        <div className="w-px h-4 bg-white/10 mx-2"></div>

        <button
            onClick={() => onAction('delete')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors text-sm font-medium"
             title="Delete Selected"
        >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
      
       <button 
        onClick={onClear}
        className="ml-2 text-zinc-500 hover:text-white transition-colors text-xs"
      >
        Cancel
      </button>
    </motion.div>
  );
};

export default BulkActionToolbar;
