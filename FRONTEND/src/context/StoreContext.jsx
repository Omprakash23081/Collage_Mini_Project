import { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient from "../services/apiClient";
import { AuthContext } from "./AuthContext.jsx";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchStoreData = useCallback(async (force = false) => {
    // If not forced and data exists and was fetched less than 5 minutes ago, don't fetch again
    const now = Date.now();
    if (!force && products.length > 0 && vendors.length > 0 && lastFetched && (now - lastFetched < 300000)) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [prodRes, vendRes] = await Promise.all([
        apiClient.get("/products"),
        apiClient.get("/auth/users")
      ]);

      setProducts(prodRes.data?.data || []);
      setVendors(vendRes.data?.data || []);
      setLastFetched(Date.now());
    } catch (err) {
      console.error("Store Context fetch error:", err);
      setError(err?.response?.data?.message || "Failed to load store data");
    } finally {
      setLoading(false);
    }
  }, [products.length, vendors.length, lastFetched]);

  // Initial fetch when user logs in
  useEffect(() => {
    if (user) {
      fetchStoreData();
    } else {
      // Clear data on logout
      setProducts([]);
      setVendors([]);
      setLastFetched(null);
    }
  }, [user, fetchStoreData]);

  return (
    <StoreContext.Provider
      value={{
        products,
        vendors,
        loading,
        error,
        fetchStoreData,
        refreshStore: () => fetchStoreData(true)
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
