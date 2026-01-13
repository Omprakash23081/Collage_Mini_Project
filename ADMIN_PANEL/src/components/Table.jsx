import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';

const Table = ({ columns, data, onEdit, onDelete, onView, isLoading, selectedItems, onSelect, onSelectAll }) => {
  // Defensive check to prevent crashes
  const safeData = Array.isArray(data) ? data.filter(item => item && typeof item === 'object') : [];

  if (isLoading) {
    return (
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-white/5 p-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  const allSelected = safeData.length > 0 && selectedItems?.length === safeData.length;

  return (
    <div className="bg-zinc-900 rounded-xl shadow-sm border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-950/50 border-b border-white/5">
              {onSelectAll && (
                  <th className="px-6 py-4 w-4">
                      <input 
                        type="checkbox" 
                        checked={allSelected}
                        onChange={(e) => onSelectAll(e.target.checked)}
                        className="rounded border-zinc-700 bg-zinc-800 text-rose-500 focus:ring-rose-500/20"
                      />
                  </th>
              )}
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {safeData.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + (onSelectAll ? 2 : 1)} className="px-6 py-8 text-center text-zinc-500">
                        No data found
                    </td>
                </tr>
            ) : (
                safeData.map((row, rowIdx) => {
                    const isSelected = selectedItems?.includes(row._id);
                    return (
                        <motion.tr 
                            key={row._id || rowIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: rowIdx * 0.05 }}
                            className={`transition-colors ${isSelected ? 'bg-rose-500/5 hover:bg-rose-500/10' : 'hover:bg-zinc-800/50'}`}
                        >
                            {onSelect && (
                                <td className="px-6 py-4 w-4">
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected || false}
                                        onChange={(e) => onSelect(row._id, e.target.checked)}
                                        className="rounded border-zinc-700 bg-zinc-800 text-rose-500 focus:ring-rose-500/20"
                                    />
                                </td>
                            )}
                            {columns.map((col, colIdx) => (
                            <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                                {col.render ? col.render(row) : row[col.accessor]}
                            </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-2">
                                    {onView && (
                                        <button 
                                            onClick={() => onView(row)}
                                            className="p-2 text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button 
                                            onClick={() => onEdit(row)}
                                            className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button 
                                            onClick={() => onDelete(row)}
                                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </motion.tr>
                    );
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
