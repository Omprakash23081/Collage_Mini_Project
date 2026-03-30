import React, { useState, useEffect, useContext } from 'react';
import style from './VendorDashboard.module.css';
import { AuthContext } from '../../context/AuthContext';
import apiClient from '../../services/apiClient';
import toast from 'react-hot-toast';
import {
  Plus,
  Package,
  Printer,
  TrendingUp,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Download,
  FileText,
  ClipboardList,
  XCircle,
  History,
  LogOut,
  User,
  QrCode,
  Upload
} from 'lucide-react';

const StationeryDashboard = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('prints'); // prints, inventory, history, analytics
  const [products, setProducts] = useState([]);
  const [printRequests, setPrintRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form state for new/edit product
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category: 'stationery',
    isAvailable: true,
    stock: 0
  });

  useEffect(() => {
    fetchProducts();
    fetchPrintRequests();
    fetchOrders();
    const interval = setInterval(() => {
      fetchPrintRequests();
      fetchOrders();
    }, 30000); // Auto refresh
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get(`/products?vendorId=${user._id}`);
      setProducts(data.data);
    } catch (error) {
      toast.error('Failed to fetch inventory');
    }
  };

  const fetchPrintRequests = async () => {
    setIsRefreshing(true);
    try {
      const { data } = await apiClient.get('/print');
      setPrintRequests(data.data);
      if (activeTab === 'prints') {
        toast.dismiss();
        toast.success('Print queue updated');
      }
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchOrders = async () => {
    setIsRefreshing(true);
    try {
      const { data } = await apiClient.get('/orders');
      setOrders(data.data);
      if (activeTab === 'history') {
        toast.dismiss();
        toast.success('Orders updated');
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('price', productForm.price);
      formData.append('description', productForm.description);
      formData.append('category', productForm.category);
      formData.append('isAvailable', productForm.isAvailable);
      formData.append('stock', productForm.stock);
      formData.append('vendorId', user._id);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editingProduct) {
        await apiClient.patch(`/products/${editingProduct._id}`, formData, config);
        toast.success('Inventory updated successfully');
      } else {
        await apiClient.post('/products', formData, config);
        toast.success('Product added successfully');
      }

      setShowProductModal(false);
      setEditingProduct(null);
      setImageFile(null);
      setProductForm({ name: '', price: '', description: '', category: 'stationery', isAvailable: true, stock: 0 });
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const updatePrintStatus = async (requestId, status) => {
    let price = undefined;
    if (status === 'Accepted' || status === 'Ready') {
      const input = window.prompt('Enter total estimated price (₹) for this request (optional):');
      if (input !== null) price = Number(input);
    }

    try {
      await apiClient.patch(`/print/${requestId}/status`, { status, totalEstimatedPrice: price });
      toast.success(`Request marked as ${status}`);
      fetchPrintRequests();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product?')) return;
    try {
      await apiClient.delete(`/products/${id}`);
      toast.success('Product removed');
      fetchProducts();
    } catch (error) {
      toast.error('Delete failed');
    }
  };



  const handleQRUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUpdatingProfile(true);
    const formData = new FormData();
    formData.append('paymentQRCode', file);

    try {
      // Use updateUser from AuthContext
      await updateUser(formData);
      toast.success('QR Code updated successfully!');
    } catch (error) {
      console.error('QR Upload error:', error);
      toast.error('Failed to upload QR code');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const getDefaultImage = (category) => {
    if (category === 'canteen') return 'file:///C:/Users/Sonu/.gemini/antigravity/brain/4d3a4b84-6ee0-48a2-8c83-df886c3d02b3/default_canteen_item_1774467638586.png';
    return 'file:///C:/Users/Sonu/.gemini/antigravity/brain/4d3a4b84-6ee0-48a2-8c83-df886c3d02b3/default_stationery_item_1774467655549.png';
  };

  return (
    <div className={style.dashboard}>
      <aside className={style.sidebar}>
        <div className={style.vendorInfo}>
          <div className={style.avatar}>{user?.name?.charAt(0)}</div>
          <h3>{user?.name}</h3>
          <span>Stationery Vendor</span>
        </div>
        <nav className={style.nav}>
          <button
            className={activeTab === 'prints' ? style.active : ''}
            onClick={() => setActiveTab('prints')}
          >
            <Printer size={20} /> <span>Print Queue</span>
          </button>
          <button
            className={activeTab === 'inventory' ? style.active : ''}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={20} /> <span>Inventory</span>
          </button>
          <button
            className={activeTab === 'history' ? style.active : ''}
            onClick={() => setActiveTab('history')}
          >
            <History size={20} /> <span>History</span>
          </button>
          <button
            className={activeTab === 'analytics' ? style.active : ''}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={20} /> <span>Analytics</span>
          </button>
          <button 
            className={activeTab === 'profile' ? style.active : ''} 
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} /> <span>Profile</span>
          </button>

          <button className={`${style.sidebarBtn} ${style.logoutBtn}`} onClick={logout}>
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className={style.mobileNav}>
        <button 
          className={activeTab === 'prints' ? style.active : ''} 
          onClick={() => setActiveTab('prints')}
        >
          <Printer size={22} />
          <span>Prints</span>
        </button>
        <button 
          className={activeTab === 'inventory' ? style.active : ''} 
          onClick={() => setActiveTab('inventory')}
        >
          <Package size={22} />
          <span>Items</span>
        </button>
        <button 
          className={activeTab === 'history' ? style.active : ''} 
          onClick={() => setActiveTab('history')}
        >
          <History size={22} />
          <span>History</span>
        </button>
        <button 
          className={activeTab === 'analytics' ? style.active : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={22} />
          <span>Stats</span>
        </button>
        <button 
          className={activeTab === 'profile' ? style.active : ''} 
          onClick={() => setActiveTab('profile')}
        >
          <User size={22} />
          <span>Profile</span>
        </button>
      </nav>

      <main className={style.mainContent}>
        {activeTab === 'prints' && (
          <div className={style.section}>
            <header className={style.sectionHeader}>
              <h2>Incoming Orders</h2>
              <button 
                onClick={fetchPrintRequests} 
                className={`${style.refreshBtn} ${isRefreshing ? style.refreshing : ''}`}
                disabled={isRefreshing}
              >
                <Clock size={16} /> {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </header>
            <div className={style.orderGrid}>
              {printRequests.filter(req => ['Pending', 'Accepted', 'Printing', 'Ready'].includes(req.status)).length === 0 ? (
                <div className={style.noData}>No active print requests found</div>
              ) : (
                printRequests.filter(req => ['Pending', 'Accepted', 'Printing', 'Ready'].includes(req.status)).map(req => (
                  <div key={req._id} className={style.orderCard}>
                    <div className={style.orderHeader}>
                      <span className={style.orderId}>#{req._id.slice(-6).toUpperCase()}</span>
                      <span className={`${style.status} ${style[req.status.toLowerCase()]}`}>
                        {req.status}
                      </span>
                    </div>
                    <div className={style.customerInfo}>
                      <strong>{req.studentId?.name || 'Unknown Student'}</strong>
                      <div className={style.fileInfo}>
                         <FileText size={16} /> <span>{req.fileName}</span>
                      </div>
                      {(req.building || req.classNumber) && (
                        <div className={style.deliveryBadge}>
                          {req.building && <span>{req.building}</span>}
                          {req.classNumber && <span>Class: {req.classNumber}</span>}
                        </div>
                      )}
                    </div>
                    <div className={style.orderItems}>
                      <div className={style.item}><span>Copies:</span> <strong>{req.settings?.copies}</strong></div>
                      <div className={style.item}><span>Mode:</span> <strong>{req.settings?.color ? 'Color' : 'B&W'}</strong></div>
                      <div className={style.item}><span>Sides:</span> <strong>{req.settings?.doubleSided ? 'Double' : 'Single'}</strong></div>
                      <div className={style.item}><span>Page Range:</span> <strong>{req.settings?.pageRange || 'All'}</strong></div>
                    </div>
                    
                    {(req.paymentProofUrl || req.paymentProof || req.transactionId) && (
                      <div className={style.paymentDetails}>
                        {(req.paymentProofUrl || req.paymentProof) && (
                          <div className={style.proofThumb} onClick={() => window.open(req.paymentProofUrl || req.paymentProof, '_blank')}>
                            <img src={req.paymentProofUrl || req.paymentProof} alt="Payment Proof" />
                          </div>
                        )}
                        {req.transactionId && (
                          <div className={style.txnBox}>
                            <span className={style.txnLabel}>Transaction ID</span>
                            <span className={style.txnValue}>{req.transactionId}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className={style.orderFooter}>
                      <a href={req.documentUrl} target="_blank" rel="noreferrer" className={style.downloadBtn}>
                        <Download size={16} /> View/Print
                      </a>
                      <div className={style.actions}>
                        {req.status === 'Pending' && (
                          <button onClick={() => updatePrintStatus(req._id, 'Accepted')} className={style.prepareBtn}>Accept</button>
                        )}
                        {req.status === 'Accepted' && (
                          <button onClick={() => updatePrintStatus(req._id, 'Printing')} className={style.readyBtn}>Start Printing</button>
                        )}
                        {req.status === 'Printing' && (
                          <button onClick={() => updatePrintStatus(req._id, 'Ready')} className={style.readyBtn}>Mark Ready</button>
                        )}
                        {req.status === 'Ready' && (
                          <button onClick={() => updatePrintStatus(req._id, 'Completed')} className={style.completeBtn}>Complete</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className={style.section}>
            <header className={style.sectionHeader}>
              <h2>Order History</h2>
              <button 
                onClick={fetchOrders} 
                className={`${style.refreshBtn} ${isRefreshing ? style.refreshing : ''}`}
                disabled={isRefreshing}
              >
                <History size={16} /> {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </header>
            <div className={style.orderGrid}>
              {orders.filter(o => ['Completed', 'Cancelled'].includes(o.status)).length === 0 ? (
                <div className={style.noData}>No past orders found</div>
              ) : (
                orders.filter(o => ['Completed', 'Cancelled'].includes(o.status)).map(order => (
                  <div key={order._id} className={`${style.orderCard} ${style.historyCard}`}>
                    <div className={style.orderHeader}>
                      <span className={style.orderId}>#{order._id.slice(-6).toUpperCase()}</span>
                      <span className={`${style.status} ${style[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className={style.customerInfo}>
                      <strong>{order.studentId?.name || 'Unknown Student'}</strong>
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      {(order.building || order.classNumber) && (
                        <div className={style.deliveryBadge}>
                          {order.building && <span>{order.building}</span>}
                          {order.classNumber && <span>Class: {order.classNumber}</span>}
                        </div>
                      )}
                    </div>
                    <div className={style.orderItems}>
                      {order.items.map((item, idx) => (
                        <div key={idx} className={style.item}>
                          <span>{item.productId?.name || 'Product'}</span>
                          <strong>x{item.quantity}</strong>
                        </div>
                      ))}
                    </div>

                    {(order.paymentProof || order.transactionId) && (
                      <div className={style.paymentDetails}>
                        {order.paymentProof && (
                          <div className={style.proofThumb} onClick={() => window.open(order.paymentProof, '_blank')}>
                            <img src={order.paymentProof} alt="Payment Proof" />
                          </div>
                        )}
                        {order.transactionId && (
                          <div className={style.txnBox}>
                            <span className={style.txnLabel}>Transaction ID</span>
                            <span className={style.txnValue}>{order.transactionId}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className={style.orderFooter}>
                      <span className={style.total}>₹{order.totalAmount}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {activeTab === 'inventory' && (
          <div className={style.section}>
            <header className={style.sectionHeader}>
              <h2>Product Inventory</h2>
              <button 
                className={style.addBtn}
                onClick={() => {
                  setEditingProduct(null);
                  setImageFile(null);
                  setProductForm({ name: '', price: '', description: '', category: 'stationery', isAvailable: true, stock: 0 });
                  setShowProductModal(true);
                }}
              >
                <Plus size={20} /> Add Item
              </button>
            </header>
            <div className={style.productTableContainer}>
              <table className={style.productTable}>
                 <thead>
                  <tr>
                    <th>Product Details</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan="5" style={{textAlign: 'center', padding: '3rem'}}>No stationery products found.</td></tr>
                  ) : (
                    products.map(product => (
                      <tr key={product._id} className={product.isAvailable ? style.availableCard : style.unavailableCard}>
                        <td>
                          <div className={style.productCell}>
                            <img 
                              src={product.image || getDefaultImage(product.category)} 
                              alt={product.name} 
                              onError={(e) => { e.target.src = getDefaultImage(product.category); }}
                            />
                            <div>
                              <strong>{product.name}</strong>
                            </div>
                          </div>
                        </td>
                        <td data-label="Price" className={style.priceCell}>₹{product.price}</td>
                        <td data-label="Stock">{product.stock}</td>
                        <td data-label="Status">
                          <span className={product.isAvailable ? style.available : style.unavailable}>
                            {product.isAvailable ? 'Available' : 'Sold Out'}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <div className={style.rowActions}>
                            <button 
                              title="Edit"
                              onClick={() => {
                                setEditingProduct(product);
                                setImageFile(null);
                                setProductForm({
                                  name: product.name,
                                  price: product.price,
                                  description: product.description,
                                  category: product.category,
                                  isAvailable: product.isAvailable,
                                  stock: product.stock
                                });
                                setShowProductModal(true);
                              }}
                            ><Edit2 size={18} /></button>
                             <button 
                               title="Remove"
                               onClick={() => deleteProduct(product._id)} 
                               className={style.deleteBtn}
                             ><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className={style.section}>
             <header className={style.sectionHeader}>
                <h2>Analytics Dashboard</h2>
             </header>
             <div className={style.statsGrid}>
                <div className={style.statCard}>
                  <div className={style.statIcon}><TrendingUp size={32} /></div>
                  <div>
                    <p>Total Revenue</p>
                    <h3>₹{printRequests.reduce((acc, curr) => acc + (curr.status === 'Completed' ? (curr.totalEstimatedPrice || 0) : 0), 0)}</h3>
                  </div>
                </div>
                <div className={style.statCard}>
                  <div className={style.statIcon}><CheckCircle size={32} /></div>
                  <div>
                    <p>Prints Completed</p>
                    <h3>{printRequests.filter(r => r.status === 'Completed').length}</h3>
                  </div>
                </div>
                <div className={style.statCard}>
                  <div className={style.statIcon}><Clock size={32} /></div>
                  <div>
                    <p>Pending Tasks</p>
                    <h3>{printRequests.filter(r => r.status !== 'Completed').length}</h3>
                  </div>
                </div>
             </div>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className={style.profileSection}>
            <header className={style.sectionHeader}>
              <h2>My Profile</h2>
            </header>

            <div className={style.profileHeader}>
              <div className={style.profileAvatarLarge}>
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className={style.profileAvatarImg} />
                ) : (
                  user?.name?.charAt(0)
                )}
              </div>
              <div className={style.profileInfo}>
                <h1 className={style.profileName}>{user?.name}</h1>
                <span className={style.profileRole}>Stationery Vendor</span>
                <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{user?.email}</span>
              </div>
            </div>

            <div className={style.profileCard}>
              <h3>Account Details</h3>
              <div className={style.profileDetailsGrid} style={{marginTop: '1.5rem'}}>
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Email Address</span>
                  <span className={style.detailValue}>{user?.email}</span>
                </div>
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Account Type</span>
                  <span className={style.detailValue}>{user?.role || 'Vendor'}</span>
                </div>
                <div className={style.detailItem}>
                   <span className={style.detailLabel}>Vendor ID</span>
                   <span className={style.detailValue}>#{user?._id?.slice(-8).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className={style.profileCard}>
              <h3>Payment Settings</h3>
              <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>
                Upload your UPI QR code here. Students will use this to pay for physical stationery or print requests.
              </p>
              
              <div className={style.qrUploadArea}>
                <div className={style.qrPreview}>
                  {user?.paymentQRCode ? (
                    <img src={user.paymentQRCode} alt="Payment QR" />
                  ) : (
                    <div style={{textAlign: 'center', opacity: 0.5}}>
                      <QrCode size={48} />
                      <p>No QR Code Uploaded</p>
                    </div>
                  )}
                </div>
                
                <input 
                  type="file" 
                  id="qr-upload" 
                  hidden 
                  accept="image/*"
                  onChange={handleQRUpload}
                  disabled={isUpdatingProfile}
                />
                <label htmlFor="qr-upload" className={style.uploadLabel}>
                  <Upload size={18} />
                  {isUpdatingProfile ? 'Uploading...' : user?.paymentQRCode ? 'Change QR' : 'Upload QR'}
                </label>
              </div>
            </div>

            <div className={style.mobileLogoutContainer}>
              <button className={style.profileLogoutBtn} onClick={logout}>
                <LogOut size={20} />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        )}
      </main>
      
      {showProductModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleProductSubmit}>
              <div className={style.formGroup}>
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. A4 Notebook"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  required 
                />
              </div>
              <div className={style.formRow}>
                <div className={style.formGroup}>
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    required 
                  />
                </div>
                <div className={style.formGroup}>
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className={style.formGroup}>
                <label>Product Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required={!editingProduct}
                />
                <small style={{color: 'var(--text-muted)'}}>Upload a clear image of the stationery item.</small>
              </div>
              <div className={style.formGroup}>
                <label>Description</label>
                <textarea 
                  placeholder="Details about the item..."
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                ></textarea>
              </div>
              <div className={style.formGroup} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <label style={{margin: 0}}>In Stock?</label>
                <input 
                  type="checkbox" 
                  style={{width: 'auto'}}
                  checked={productForm.isAvailable}
                  onChange={(e) => setProductForm({...productForm, isAvailable: e.target.checked})}
                />
              </div>
              <div className={style.modalFooter}>
                <button type="button" onClick={() => setShowProductModal(false)}>Cancel</button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationeryDashboard;
