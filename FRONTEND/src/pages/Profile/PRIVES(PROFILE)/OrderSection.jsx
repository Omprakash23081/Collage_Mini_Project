import { useEffect } from "react";
import { FiShoppingBag, FiClock, FiCheckCircle, FiXCircle, FiRefreshCw } from "react-icons/fi";
import { orderService } from "../../../services/orderService.js";
import { useActivity } from "../../../context/ActivityContext.jsx";
import style from "./OrderSection.module.css";

const OrderSection = () => {
  const { orders, loading, error, refreshActivity, removeLocalOrder } = useActivity();

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await orderService.delete(orderId);
      removeLocalOrder(orderId);
    } catch (err) {
      console.error("Delete failed", err);
      // In case of error, refresh from server to sync state
      refreshActivity();
    }
  };

  useEffect(() => {
    refreshActivity();
  }, []);

  const safeOrders = Array.isArray(orders) ? orders : [];
  const activeOrders = safeOrders.filter((o) => ["Pending", "Preparing", "Ready"].includes(o.status));
  const pastOrders = safeOrders.filter((o) => ["Completed", "Rejected"].includes(o.status));

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
      case "Preparing":
        return <FiClock className={style.statusIcon} />;
      case "Ready":
      case "Completed":
        return <FiCheckCircle className={style.statusIcon} />;
      case "Rejected":
        return <FiXCircle className={style.statusIcon} />;
      default:
        return <FiShoppingBag className={style.statusIcon} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return style.statusPending;
      case "Preparing": return style.statusPreparing;
      case "Ready": return style.statusReady;
      case "Completed": return style.statusCompleted;
      case "Rejected": return style.statusRejected;
      default: return "";
    }
  };

  const OrderCard = ({ order }) => (
    <div className={style.orderCard}>
      <div className={style.orderHeader}>
        <h3>Order #{order._id?.slice(-6).toUpperCase()}</h3>
        <span className={style.orderDate}>
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className={style.orderDetails}>
        {order.items?.map((item, idx) => (
          <div key={idx} className={style.orderItem}>
            <span>{item.quantity}x {item.productId?.name || "Product"}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
        <div className={style.orderTotal}>
          <span>Total</span>
          <span className={style.totalAmount}>₹{order.totalAmount}</span>
        </div>
      </div>

      <div className={style.orderFooter}>
        <div className={style.footerLeft}>
          <div className={`${style.statusBadge} ${getStatusClass(order.status)}`}>
            {getStatusIcon(order.status)}
            <span>{order.status}</span>
          </div>
          <span className={style.vendorName}>From: {order.vendorId?.name || "Vendor"}</span>
        </div>
        {order.status === "Pending" && (
          <button 
            className={style.cancelBtn}
            onClick={() => handleDeleteOrder(order._id)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );

  if (loading) return <div className={style.loadingState}>Loading orders...</div>;
  if (error) return <div className={style.errorState}>{error}</div>;

  return (
    <div className={style.orderContainer}>
      <div className={style.sectionHeader}>
        <h2 className={style.sectionTitle}>Active Orders</h2>
        <button className={style.refreshBtn} onClick={refreshActivity}><FiRefreshCw /> Refresh</button>
      </div>
      
      {activeOrders.length > 0 ? (
        <div className={style.orderGrid}>
          {activeOrders.map(order => <OrderCard key={order._id} order={order} />)}
        </div>
      ) : (
        <div className={style.emptyState}>
          <FiShoppingBag className={style.emptyIcon} />
          <p>You have no active orders.</p>
        </div>
      )}

      <div className={style.sectionHeader} style={{ marginTop: '3rem' }}>
        <h2 className={style.sectionTitle}>Order History</h2>
      </div>
      {pastOrders.length > 0 ? (
        <div className={style.orderGrid}>
          {pastOrders.map(order => <OrderCard key={order._id} order={order} />)}
        </div>
      ) : (
        <div className={style.emptyState}>
          <FiShoppingBag className={style.emptyIcon} />
          <p>Your order history is empty.</p>
        </div>
      )}
    </div>
  );
};

export default OrderSection;
