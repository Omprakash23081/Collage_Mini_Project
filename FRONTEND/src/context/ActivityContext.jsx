import { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient from "../services/apiClient";
import { AuthContext } from "./AuthContext.jsx";

export const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [printRequests, setPrintRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchActivityData = useCallback(async (force = false) => {
    // Cache for 2 minutes since activity changes more frequently
    const now = Date.now();
    if (!force && lastFetched && (now - lastFetched < 120000)) {
       return;
    }

    setLoading(true);
    setError(null);
    try {
      const [orderRes, printRes] = await Promise.all([
        apiClient.get("/orders"),
        apiClient.get("/print")
      ]);

      setOrders(orderRes.data?.data || []);
      setPrintRequests(printRes.data?.data || []);
      setLastFetched(Date.now());
    } catch (err) {
      console.error("Activity Context fetch error:", err);
      // Don't show error for background refresh unless it's a hard error
      if (force) setError(err?.response?.data?.message || "Failed to load activity history");
    } finally {
      setLoading(false);
    }
  }, [lastFetched]);

  // Initial fetch on login
  useEffect(() => {
    if (user) {
      fetchActivityData();
    } else {
      setOrders([]);
      setPrintRequests([]);
      setLastFetched(null);
    }
  }, [user, fetchActivityData]);

  // Method to add a new order locally to avoid re-fetch
  const addLocalOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  // Method to update an order locally (e.g. status change)
  const updateLocalOrder = (orderId, updates) => {
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, ...updates } : o));
  };

  // Method to remove an order locally (e.g. cancel)
  const removeLocalOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o._id !== orderId));
  };

  // Same for Print Requests
  const addLocalPrintRequest = (request) => {
    setPrintRequests(prev => [request, ...prev]);
  };

  const updateLocalPrintStatus = (requestId, status, price) => {
    setPrintRequests(prev => prev.map(r => r._id === requestId ? { ...r, status, totalEstimatedPrice: price } : r));
  };

  const removeLocalPrintRequest = (requestId) => {
    setPrintRequests(prev => prev.filter(r => r._id !== requestId));
  };

  return (
    <ActivityContext.Provider
      value={{
        orders,
        printRequests,
        loading,
        error,
        fetchActivityData,
        refreshActivity: () => fetchActivityData(true),
        addLocalOrder,
        updateLocalOrder,
        removeLocalOrder,
        addLocalPrintRequest,
        updateLocalPrintStatus,
        removeLocalPrintRequest
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};
