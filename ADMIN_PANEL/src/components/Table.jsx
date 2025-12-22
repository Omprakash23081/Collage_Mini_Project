import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';

const Table = ({ columns, data, onEdit, onDelete, onView, isLoading }) => {
  if (isLoading) {
    return (
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-white/5 p-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-xl shadow-sm border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-950/50 border-b border-white/5">
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
            {data.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-zinc-500">
                        No data found
                    </td>
                </tr>
            ) : (
                data.map((row, rowIdx) => (
                <motion.tr 
                    key={row._id || rowIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: rowIdx * 0.05 }}
                    className="hover:bg-zinc-800/50 transition-colors"
                >
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
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
