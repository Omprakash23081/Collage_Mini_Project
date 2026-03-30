import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiClient from "../../services/apiClient.js";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Star,
  Shield,
  ShoppingCart,
  Printer,
} from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./PrimiumHome.module.css";
import SubjectArea from "./Subject_areas.jsx";

function PrimiumHome() {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setSearching(true);
        try {
          // Use the centralized apiClient for searches
          const response = await apiClient.get(`/search?q=${query}`);
          if (response.data.success) {
            setResults(response.data.data);
          }
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setSearching(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className={styles.homeContainer}>
      {/* Header Section */}
      <div className={styles.welcomeHeader}>
        <div className={styles.titleRow}>
          <h1 className={styles.welcomeTitle}>
            Hello,{" "}
            <span style={{ color: "#F43F5E", textTransform: "capitalize" }}>{user?.name || "Scholar"}</span>
          </h1>
          <Link to="/home" className={styles.backHomeBtn}>
            <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
            Normal Mode
          </Link>
        </div>
        <p className={styles.welcomeSubtitle}>
          Ready to learn something new today?
        </p>
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchInputWrapper}>
          <Search size={24} color="var(--text-muted)" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for notes, PYQs, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {searching && (
            <span style={{ color: "#71717A", fontSize: "0.9rem" }}>
              Searching...
            </span>
          )}
        </div>

        {/* User Results Dropdown */}
        {results.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "105%",
              left: 0,
              right: 0,
              background: "var(--bg-glass)",
              backdropFilter: "blur(20px)",
              borderRadius: "1.5rem",
              border: "1px solid var(--border-subtle)",
              zIndex: 100,
              overflow: "hidden",
              boxShadow: "var(--shadow-deep)",
            }}
          >
            {results.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.25rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.isPremium ? "#F59E0B" : "#A1A1AA",
                    }}
                  >
                    {item.isPremium ? (
                      <Shield size={24} />
                    ) : (
                      <BookOpen size={24} />
                    )}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "700",
                        fontSize: "1.05rem",
                        color: "var(--text-primary)",
                        marginBottom: "0.25rem"
                      }}
                    >
                      {item.title || item.subject}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {item.type === "pyq"
                        ? `PYQ • ${item.year}`
                        : `Notes • ${item.subject}`}
                    </p>
                  </div>
                </div>
                {item.isPremium && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#F59E0B",
                      background: "rgba(245, 158, 11, 0.1)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "6px",
                      fontWeight: "700"
                    }}
                  >
                    PREMIUM
                  </span>
                )}
              </div>
            ))}
            <div
              style={{
                padding: "1rem",
                textAlign: "center",
                fontSize: "0.95rem",
                color: "#71717A",
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.02)"
              }}
            >
              View all results
            </div>
          </div>
        )}
      </div>

      {/* Quick Services Section moved out for better layout */}
      <div className={styles.quickServices}>
        <Link to="canteen" className={styles.serviceCard}>
          <div className={`${styles.serviceIcon} ${styles.foodIcon}`}>
            <ShoppingCart size={28} />
          </div>
          <div className={styles.serviceText}>
            <h3>Place Order</h3>
            <p>Canteen & Stationery</p>
          </div>
          <ArrowRight size={20} className={styles.serviceArrow} />
        </Link>

        <Link to="print" className={styles.serviceCard}>
          <div className={`${styles.serviceIcon} ${styles.printIcon}`}>
            <Printer size={28} />
          </div>
          <div className={styles.serviceText}>
            <h3>Print Order</h3>
            <p>Documents & Notes</p>
          </div>
          <ArrowRight size={20} className={styles.serviceArrow} />
        </Link>
      </div>

      {/* Hero Stats */}
      <div className={styles.heroStats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user?.streak || 0} 🔥</span>
          <span className={styles.statLabel}>Day Streak</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>100+</span>
          <span className={styles.statLabel}>Resources</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>∞</span>
          <span className={styles.statLabel}>Opportunities</span>
        </div>
      </div>

      {/* Info Grid (Continue Learning & Exam Mode) */}
      <div className={styles.infoGrid}>
        {/* Continue Learning */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Clock size={22} color="#F43F5E" /> Continue Learning
            </h3>
          </div>

          {user?.courses?.length > 0 ? (
            <div className={styles.statsGrid}>
              {user.courses.slice(0, 3).map((course, i) => (
                <div key={i} className={styles.statRow}>
                  <div className={styles.statIndicator}></div>
                  <div>
                    <p style={{ fontWeight: "700", marginBottom: "0.25rem" }}>{course.name}</p>
                    <p style={{ fontSize: "0.85rem", color: "#71717A" }}>
                      {course.progress}% Complete
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#71717A",
                padding: "2rem 0",
              }}
            >
              <p>No recent activity.</p>
              <button
                style={{
                  marginTop: "1.5rem",
                  background: "#F43F5E",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600"
                }}
              >
                Start browsing
              </button>
            </div>
          )}
        </div>

        {/* Exam Mode / Daily Suggestion */}
        <div className={styles.infoCard} style={{ background: "linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(0, 0, 0, 0.4))" }}>
          <h3 className={`${styles.cardTitle} ${styles.examTitle}`} style={{ marginBottom: "1rem" }}>
            Exam Mode
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              marginBottom: "2.5rem",
              lineHeight: "1.6"
            }}
          >
            Prepare for your upcoming exams with our curated PYQ sets and focused study plans.
          </p>
          <Link to="pyq" className={styles.examModeButton}>
            View PYQs <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div style={{ paddingTop: "2rem" }}>
        <h2 className={styles.welcomeTitle} style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>
          Browse Categories
        </h2>
        <SubjectArea />
      </div>
    </div>
  );
}
export default PrimiumHome;
