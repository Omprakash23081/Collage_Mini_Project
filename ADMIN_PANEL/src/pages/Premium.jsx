import { useState, useEffect } from 'react';
import { planService } from '../services/planService';
import { Loader2, Plus, Edit, Trash2, Check, X, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';

const Premium = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    prices: { monthly: 0, quarterly: 0, yearly: 0 },
    features: [] 
  });

  // Default features list (to start with if empty)
  const defaultFeatureNames = [
    "All content",
    "Chapter-wise PYQs",
    "Most Important Selected Qs Bank",
    "AKTU Video Solutions",
    "Number of devices"
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await planService.getAll();
      if (response && response.data) {
        setPlans(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch plans", error);
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      prices: { ...plan.prices },
      features: plan.features.map(f => ({ ...f }))
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      prices: { monthly: 0, quarterly: 0, yearly: 0 },
      features: defaultFeatureNames.map(name => ({ name, included: true, textValue: '' }))
    });
    setIsModalOpen(true);
  };

  /* Delete Confirmation State */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const confirmDelete = (plan) => {
    setPlanToDelete(plan);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!planToDelete) return;
    try {
        await planService.delete(planToDelete._id);
        toast.success("Plan deleted successfully");
        setIsDeleteModalOpen(false);
        fetchPlans();
    } catch (error) {
        toast.error("Failed to delete plan");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingPlan) {
        await planService.update(editingPlan._id, formData);
        toast.success("Plan updated successfully");
      } else {
        await planService.create(formData);
        toast.success("New Plan created");
      }
      setIsModalOpen(false);
      fetchPlans();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Operation failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][field] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const renderFeatureRow = (featureName) => {
    return (
      <tr key={featureName} className="border-b border-white/5">
        <td className="py-4 text-zinc-400 text-sm">{featureName}</td>
        {plans.map(plan => {
          const feature = plan.features.find(f => f.name === featureName);
          return (
            <td key={plan._id} className="py-4 text-center">
              {feature ? (
                feature.textValue ? (
                  <span className="text-zinc-200 font-medium">{feature.textValue}</span>
                ) : feature.included ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-500">
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-500">
                    <X size={14} />
                  </span>
                )
              ) : (
                <span className="text-zinc-600">-</span>
              )}
            </td>
          );
        })}
      </tr>
    );
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-rose-500" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Premium Plans</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage subscription pricing and features</p>
        </div>
        <button onClick={handleAddNew} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 rounded-2xl border border-white/5">
          <Shield className="mx-auto text-zinc-700 mb-4" size={48} />
          <h3 className="text-zinc-300 font-medium">No Plans Found</h3>
          <p className="text-zinc-500 text-sm mt-2">Create your first subscription plan to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pricing Cards Preview */}
            <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-200">Pricing Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {plans.map(plan => (
                        <div key={plan._id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                             <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(plan)} className="p-2 bg-zinc-800 rounded-lg text-zinc-300 hover:text-white"><Edit size={16} /></button>
                                <button onClick={() => confirmDelete(plan)} className="p-2 bg-zinc-800 rounded-lg text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                             </div>
                            <h3 className={`text-xl font-bold ${plan.name === 'Super' ? 'text-amber-400' : 'text-rose-400'}`}>{plan.name}</h3>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Monthly</span>
                                    <span className="text-zinc-200 font-mono">₹{plan.prices.monthly}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Quarterly</span>
                                    <span className="text-zinc-200 font-mono">₹{plan.prices.quarterly}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Yearly</span>
                                    <span className="text-zinc-200 font-mono">₹{plan.prices.yearly}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 overflow-x-auto">
                <h2 className="text-lg font-semibold text-zinc-200 mb-4">Feature Comparison</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="pb-4 text-zinc-500 font-medium text-sm w-1/2">Features</th>
                            {plans.map(plan => (
                                <th key={plan._id} className={`pb-4 text-center font-bold ${plan.name === 'Super' ? 'text-amber-400' : 'text-rose-400'}`}>
                                    {plan.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {defaultFeatureNames.map(featureName => renderFeatureRow(featureName))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPlan ? `Edit ${editingPlan.name}` : 'Create New Plan'}>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Plan Name</label>
                <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50 outline-none"
                    placeholder="e.g. Premium"
                    required
                />
            </div>

            <div className="grid grid-cols-3 gap-3">
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500">Monthly (₹)</label>
                    <input 
                        type="number" 
                        value={formData.prices.monthly} 
                        onChange={e => setFormData({...formData, prices: {...formData.prices, monthly: e.target.value}})} 
                        className="w-full bg-zinc-800 border-none rounded-lg p-2 text-zinc-100 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500">Quarterly (₹)</label>
                    <input 
                        type="number" 
                        value={formData.prices.quarterly} 
                        onChange={e => setFormData({...formData, prices: {...formData.prices, quarterly: e.target.value}})} 
                        className="w-full bg-zinc-800 border-none rounded-lg p-2 text-zinc-100 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500">Yearly (₹)</label>
                    <input 
                        type="number" 
                        value={formData.prices.yearly} 
                        onChange={e => setFormData({...formData, prices: {...formData.prices, yearly: e.target.value}})} 
                        className="w-full bg-zinc-800 border-none rounded-lg p-2 text-zinc-100 outline-none"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400">Features Config</label>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {formData.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-zinc-800/50 p-2 rounded-lg">
                            <span className="text-xs text-zinc-300 w-1/3 truncate" title={feature.name}>{feature.name}</span>
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={feature.included} 
                                        onChange={e => handleFeatureChange(idx, 'included', e.target.checked)}
                                        className="w-4 h-4 accent-green-500"
                                    />
                                    <span className="text-xs text-zinc-500">Include</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Value (opt)" 
                                    value={feature.textValue || ''}
                                    onChange={e => handleFeatureChange(idx, 'textValue', e.target.value)}
                                    className="w-20 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl transition-colors flex justify-center">
                 {submitting ? <Loader2 className="animate-spin" /> : 'Save Plan'}
            </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Plan?">
            <div className="space-y-4">
                <p className="text-zinc-400">
                    Are you sure you want to delete <strong>{planToDelete?.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end mt-4">
                     <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700">Cancel</button>
                     <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Permanently</button>
                </div>
            </div>
        </Modal>
    </div>
  );
};

export default Premium;
