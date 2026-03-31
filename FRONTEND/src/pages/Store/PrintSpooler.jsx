import React, { useState, useEffect } from 'react';
import style from './PrintSpooler.module.css';
import apiClient from '../../services/apiClient';
import toast from 'react-hot-toast';
import { CloudUpload, FileText, Settings, CreditCard, Clock, CheckCircle, X, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useActivity } from '../../context/ActivityContext';

const PrintSpooler = () => {
  const [file, setFile] = useState(null);
  const { vendors: allVendors, fetchStoreData } = useStore();
  const { printRequests: requests, fetchActivityData, addLocalPrintRequest, removeLocalPrintRequest } = useActivity();
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    copies: 1,
    color: false,
    doubleSided: false,
    pageRange: 'All'
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [building, setBuilding] = useState('');
  const [classNumber, setClassNumber] = useState('');

  useEffect(() => {
    // Filter vendors for stationery only
    const stationeryShops = allVendors.filter(v => v.role === 'stationery_vendor');
    setVendors(stationeryShops);
    if (stationeryShops.length > 0 && !selectedVendor) {
      setSelectedVendor(stationeryShops[0]._id);
    }
  }, [allVendors, selectedVendor]);

  useEffect(() => {
    fetchStoreData();
    fetchActivityData();
  }, []);
  
  const deleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this print request?')) return;
    try {
      await apiClient.delete(`/print/${id}`);
      toast.success('Print request cancelled');
      removeLocalPrintRequest(id);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
        toast.error('Please select a file to print');
        return;
    }
    if (!selectedVendor) {
        toast.error('Please select a stationery shop. (If none appear, no vendors are registered)');
        return;
    }
    setShowPaymentModal(true);
  };

  const completeRequest = async () => {
    if (!paymentProof && !transactionId) {
      toast.error('Please provide payment proof or Transaction ID');
      return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append('document', file);
    fd.append('vendorId', selectedVendor);
    fd.append('settings', JSON.stringify(settings));
    fd.append('transactionId', transactionId);
    fd.append('building', building);
    fd.append('classNumber', classNumber);
    if (paymentProof) {
      fd.append('paymentProof', paymentProof);
    }

    try {
      const res = await apiClient.post('/print', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Print request submitted!');
      if (res.data?.data) addLocalPrintRequest(res.data.data);
      setFile(null);
      setShowPaymentModal(false);
      setPaymentProof(null);
      setTransactionId('');
      setBuilding('');
      setClassNumber('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.uploadSection}>
        <div className={style.card}>
          <h2>New Print Request</h2>
          <form onSubmit={handleSubmit}>
             <div className={style.uploadArea}>
                <input 
                  type="file" 
                  id="print-file" 
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                        const type = selectedFile.type;
                        if (type.includes('video') || type === 'image/gif') {
                            toast.error('Videos and GIFs are not allowed for printing');
                            return;
                        }
                        setFile(selectedFile);
                    }
                  }}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.txt,.xlsx,.xls,.csv"
                  style={{display: 'none'}}
                />
                <label htmlFor="print-file" className={style.dropzone}>
                  {file ? (
                    <div className={style.fileSelected}>
                      <FileText size={48} />
                      <span>{file.name}</span>
                    </div>
                  ) : (
                    <div className={style.placeholder}>
                      <CloudUpload size={48} strokeWidth={1.5} />
                      <p>Click to upload document (PDF, DOCX)</p>
                    </div>
                  )}
                </label>
             </div>

             <div className={style.settingsGrid}>
                <div className={style.settingItem}>
                   <label>Select Shop</label>
                   <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
                      {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
                      {vendors.length === 0 && <option value="">No shops available</option>}
                   </select>
                </div>
                <div className={style.settingItem}>
                   <label>Copies</label>
                   <input 
                    type="number" 
                    min="1" 
                    value={settings.copies} 
                    onChange={(e) => setSettings({...settings, copies: e.target.value})}
                   />
                </div>
                <div className={style.settingItem}>
                   <label>Page Range</label>
                   <input 
                    type="text" 
                    placeholder="e.g. 1-5, 8" 
                    value={settings.pageRange}
                    onChange={(e) => setSettings({...settings, pageRange: e.target.value})}
                   />
                </div>
             </div>

             <div className={style.checkboxes}>
                <label className={style.checkbox}>
                  <input 
                    type="checkbox" 
                    checked={settings.color}
                    onChange={(e) => setSettings({...settings, color: e.target.checked})}
                  />
                  <span>Color Printing</span>
                </label>
                <label className={style.checkbox}>
                  <input 
                    type="checkbox" 
                    checked={settings.doubleSided}
                    onChange={(e) => setSettings({...settings, doubleSided: e.target.checked})}
                  />
                  <span>Double Sided</span>
                </label>
             </div>

             <button type="submit" className={style.submitBtn} disabled={loading || !file || !selectedVendor}>
               {loading ? 'Submitting...' : 'Send to Printer'}
             </button>
          </form>
        </div>
      </div>

      <div className={style.historySection}>
         <h2>Recent Requests</h2>
         <div className={style.historyList}>
            {requests.length === 0 ? (
              <p style={{opacity: 0.5, textAlign: 'center', marginTop: '2rem'}}>No past requests found.</p>
            ) : (
              requests.map(req => (
                <div key={req._id} className={style.historyCard}>
                   <div className={style.historyInfo}>
                      <FileText size={20} />
                      <div>
                         <strong>{req.fileName}</strong>
                         <p>{new Date(req.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className={style.historyStatus}>
                      <span className={`${style.status} ${style[req.status.toLowerCase()]}`}>
                         {req.status}
                      </span>
                      {req.totalEstimatedPrice && <span className={style.price}>₹{req.totalEstimatedPrice}</span>}
                      <div className={style.itemActions}>
                         <button 
                           onClick={() => window.open(req.documentUrl, '_blank')} 
                           className={style.previewBtn} 
                           title="Preview Document"
                         >
                           <Eye size={14} />
                         </button>
                         {req.status === 'Pending' && (
                           <button onClick={() => deleteRequest(req._id)} className={style.deleteBtn} title="Cancel">
                             <X size={14} />
                           </button>
                         )}
                      </div>
                   </div>
                </div>
              ))
            )}
         </div>
      </div>

      {showPaymentModal && (
        <div className={style.modalOverlay}>
          <div className={style.paymentModal}>
            <h2>Complete Payment</h2>
            <p>Scan the QR code of the selected shop to pay.</p>
            
            <div className={style.qrContainer}>
              {vendors.find(v => v._id === selectedVendor)?.paymentQRCode ? (
                <img src={vendors.find(v => v._id === selectedVendor).paymentQRCode} alt="Shop QR" />
              ) : (
                <div className={style.noQr}>
                  <p>QR Not Uploaded by Shop</p>
                </div>
              )}
            </div>

            <div className={style.formGroup}>
              <label>Transaction ID / Message</label>
              <input 
                type="text" 
                placeholder="Enter Transaction ID or your name"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>

            <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
                <div className={style.formGroup} style={{flex: 1, marginBottom: 0}}>
                    <label>Building</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Block A" 
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                    />
                </div>
                <div className={style.formGroup} style={{flex: 1, marginBottom: 0}}>
                    <label>Class/Room No.</label>
                    <input 
                        type="text" 
                        placeholder="e.g. 102"
                        value={classNumber}
                        onChange={(e) => setClassNumber(e.target.value)}
                    />
                </div>
            </div>

            <div className={style.formGroup}>
              <label>Payment Screenshot (Optional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setPaymentProof(e.target.files[0])}
              />
            </div>

            <div className={style.modalActions}>
              <button className={style.cancelBtn} onClick={() => setShowPaymentModal(false)}>Cancel</button>
              <button 
                className={style.confirmBtn} 
                onClick={completeRequest}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Confirm & Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintSpooler;
