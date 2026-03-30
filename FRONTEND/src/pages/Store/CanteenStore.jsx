import React, { useState, useEffect } from 'react';
import style from './CanteenStore.module.css';
import apiClient from '../../services/apiClient';
import toast from 'react-hot-toast';
import { ShoppingCart, Search, Filter, Info, Minus, Plus, X, Clock } from 'lucide-react';

const CanteenStore = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('canteen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('canteen_cart', JSON.stringify(cart));
  }, [cart]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [selectedVendors, setSelectedVendors] = useState({}); // { productName: vendorId }
  const [building, setBuilding] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get('/products?category=canteen');
      setProducts(data.data.filter(p => p.isAvailable));
    } catch (error) {
      toast.error('Failed to load menu');
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await apiClient.get('/orders');
      setOrders(data.data);
    } catch (error) {
      console.error('Failed to load orders');
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Cancel this order?')) return;
    try {
      await apiClient.delete(`/orders/${id}`);
      toast.success('Order cancelled');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel');
    }
  };

  const addToCart = (product) => {
    const vendorId = product.vendorId._id || product.vendorId;
    setCart(prev => {
      const existing = prev.find(item => item.productId === product._id);
      if (existing) {
        return prev.map(item => 
          item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        productId: product._id, 
        vendorId: vendorId,
        vendorName: product.vendorId.name,
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }];
    });
    toast.success(`${product.name} from ${product.vendorId.name} added!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.productId === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    setShowPaymentModal(true);
  };

  const completeOrder = async () => {
    if (!paymentProof && !transactionId) {
      toast.error('Please provide payment proof or Transaction ID');
      return;
    }

    setLoading(true);
    try {
      // Get unique vendors in cart
      const vendorsInCart = [...new Set(cart.map(item => item.vendorId))];
      
      // Process one vendor at a time
      const currentVendorId = vendorsInCart[0];
      const itemsForVendor = cart.filter(item => item.vendorId === currentVendorId);
      const subtotal = itemsForVendor.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

      const orderItems = itemsForVendor.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }));

      const formData = new FormData();
      formData.append('vendorId', currentVendorId);
      formData.append('items', JSON.stringify(orderItems));
      formData.append('totalAmount', subtotal);
      formData.append('transactionId', transactionId);
      formData.append('building', building);
      formData.append('classNumber', classNumber);
      if (paymentProof) {
        formData.append('paymentProof', paymentProof);
      }

      await apiClient.post('/orders', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success(`Order placed with ${itemsForVendor[0].vendorName}!`);
      await fetchOrders();
      
      // Remove these items from cart
      const remainingCart = cart.filter(item => item.vendorId !== currentVendorId);
      setCart(remainingCart);
      
      // Reset payment fields
      setPaymentProof(null);
      setTransactionId('');
      
      // If cart still has items from other vendors, stay in modal for next vendor
      if (remainingCart.length === 0) {
        setShowPaymentModal(false);
        setBuilding('');
        setClassNumber('');
      } else {
        toast.loading(`Moving to next payment...`, { duration: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = (category) => {
    if (category === 'canteen') return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'; // High quality food
    return 'https://images.unsplash.com/photo-1583484963886-928193201f97?auto=format&fit=crop&q=80&w=800'; // Stationery
  };

  const CartContents = () => (
    <>
      <div className={style.cartItems}>
        {cart.length === 0 ? (
          <div className={style.emptyCart}>
            <Info size={40} />
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.productId} className={style.cartItem}>
              <div className={style.itemMeta}>
                <span>{item.name}</span>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
              <div className={style.qtyControls}>
                <button onClick={() => updateQuantity(item.productId, -1)}><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, 1)}><Plus size={14} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className={style.cartFooter}>
          <div className={style.totalRow}>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <button 
            className={style.checkoutBtn} 
            onClick={() => {
                setIsCartOpen(false);
                placeOrder();
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className={style.storeContainer}>
      <div className={style.mainContent}>
        <header className={style.header}>
          <div className={style.searchBar}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search delicious food..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className={style.productGrid}>
          {Object.entries(
            products
              .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .reduce((acc, p) => {
                if (!acc[p.name]) acc[p.name] = [];
                acc[p.name].push(p);
                return acc;
              }, {})
          ).map(([name, variants]) => {
            const selectedId = selectedVendors[name] || variants[0]._id;
            const activeProduct = variants.find(v => v._id === selectedId) || variants[0];
            const hasMultiple = variants.length > 1;

            return (
              <div key={name} className={style.productCard}>
                <div className={style.imageWrapper}>
                  <img 
                    src={activeProduct.image || getDefaultImage(activeProduct.category)} 
                    alt={name} 
                    onError={(e) => { e.target.src = getDefaultImage(activeProduct.category); }}
                  />
                  <span className={style.priceTag}>₹{activeProduct.price}</span>
                  {hasMultiple && <span className={style.multiBadge}>Multi-Vendor</span>}
                </div>
                <div className={style.productInfo}>
                  <div className={style.titleRow}>
                    <h3>{name}</h3>
                    {hasMultiple ?  (
                         <span className={style.variantCount}>{variants.length} Shops</span>
                    ) : (
                         <span className={style.vendorBadge}>{activeProduct.vendorId?.name}</span>
                    )}
                  </div>
                  <p className={style.description}>{activeProduct.description}</p>
                  
                  {hasMultiple ? (
                    <div className={style.vendorPicker}>
                       <label>Select Your Favorite Shop:</label>
                       <div className={style.vendorList}>
                          {variants.map(v => (
                            <button 
                              key={v._id}
                              className={selectedId === v._id ? style.activeVendor : ''}
                              onClick={() => setSelectedVendors(prev => ({ ...prev, [name]: v._id }))}
                            >
                              <span className={style.vName}>{v.vendorId?.name || 'Shop'}</span>
                              <span className={style.vPrice}>₹{v.price}</span>
                            </button>
                          ))}
                       </div>
                    </div>
                  ) : (
                    <div className={style.singleVendorInfo}>
                       <div className={style.vendorTag}>
                          <Info size={12} />
                          <span>Guaranteed by {activeProduct.vendorId?.name}</span>
                       </div>
                    </div>
                  )}

                  <button onClick={() => addToCart(activeProduct)} className={style.addBtn}>
                    <Plus size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className={style.cartSide}>
        <div className={style.sidebarTabs}>
           <button 
             className={!isHistoryVisible ? style.activeTab : ''} 
             onClick={() => setIsHistoryVisible(false)}
           >
             <ShoppingCart size={18} /> Cart
           </button>
           <button 
             className={isHistoryVisible ? style.activeTab : ''} 
             onClick={() => setIsHistoryVisible(true)}
           >
             <Clock size={18} /> Orders
           </button>
        </div>

        {!isHistoryVisible ? (
          <>
            <div className={style.sidebarHeaderOneLine}>
              <ShoppingCart size={24} />
              <h2>Your Cart</h2>
            </div>
            <CartContents />
          </>
        ) : (
          <div className={style.historySection}>
            <div className={style.sidebarHeaderOneLine}>
              <Clock size={24} />
              <h2>Recent Orders</h2>
            </div>
            <div className={style.historyList}>
              {orders.length === 0 ? (
                <div className={style.emptyCart}>No recent orders</div>
              ) : (
                orders.map(order => (
                  <div key={order._id} className={style.cartItem}>
                    <div className={style.itemMeta}>
                       <span className={style.orderStatus}>{order.status}</span>
                       <span className={style.itemPrice}>₹{order.totalAmount}</span>
                    </div>
                    <div className={style.orderBrief}>
                       {order.items.map(i => i.productId?.name).join(', ').slice(0, 30)}...
                    </div>
                    {order.status === 'Pending' && (
                      <button onClick={() => deleteOrder(order._id)} className={style.cancelBtn}>Cancel Order</button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Floating Cart Button for Mobile */}
      {cart.length > 0 && (
        <button className={style.floatingCartBtn} onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={24} />
          <span className={style.cartBadge}>{cart.length}</span>
        </button>
      )}

      {/* Mobile Cart Drawer */}
      {isCartOpen && (
        <div className={style.cartDrawerOverlay} onClick={() => setIsCartOpen(false)}>
          <div className={style.cartDrawer} onClick={e => e.stopPropagation()}>
            <div className={style.drawerHeader}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <ShoppingCart size={24} />
                <h2>Your Cart</h2>
              </div>
              <button className={style.closeBtn} onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
              <CartContents />
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className={style.modalOverlay}>
          <div className={style.paymentModal}>
            {(() => {
                const currentVendorId = [...new Set(cart.map(item => item.vendorId))][0];
                const vendorData = products.find(p => (p.vendorId?._id || p.vendorId) === currentVendorId)?.vendorId;
                const vendorSubtotal = cart.filter(i => i.vendorId === currentVendorId).reduce((a, b) => a + (b.price * b.quantity), 0);

                return (
                    <>
                    <h2>Pay to {vendorData?.name || 'Shop'}</h2>
                    <p>Subtotal for this vendor: <strong>₹{vendorSubtotal}</strong></p>
                    
                    <div className={style.qrContainer}>
                        {vendorData?.paymentQRCode ? (
                            <img src={vendorData.paymentQRCode} alt="Vendor QR" />
                        ) : (
                            <div className={style.noQr}>Vendor QR not available. Contact staff.</div>
                        )}
                    </div>
                    </>
                );
            })()}

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
                onClick={completeOrder}
                disabled={loading}
              >
                {loading ? 'Confirming...' : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanteenStore;
