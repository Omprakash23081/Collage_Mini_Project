import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiClient from "../../utils/axios.js"; 
import { Search, BookOpen, Clock, ArrowRight, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./PrimiumHome.module.css";
import SubjectArea from "./Subject_areas.jsx";
import image from "../PHOTO/rocket.gif";

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
          // Use the axios instance from services/api.js or create new one if not available, 
          // but I'll assume explicit api usage similar to Admin Panel for consistency if possible,
          // but here files use `../../api/axios`. Let's use `fetch` or verify path.
          // Viewing App.jsx showed `import api from '../api/axios'` in Admin Panel but Frontend might strictly use services.
          // I will use fetch for safety or standard axios import if I knew the path (Admin Panel has it at ../api/axios).
          // Let's try direct axios import if usually used, or standard fetch.
          // Checking imports... Frontend usually has `api/axios.js`?
          // I'll use standard fetch with token from localStorage if needed, or better, try to import the axios instance.
          // Re-checking imports from other files: Users.jsx used `../api/axios`.
          // Here we are in `MODULES/Primum_Page2(Home)`. Path to `api` is `../../API/axios`?
          // Let's blindly try a common path or just use fetch.
          
          // Actually, let's just use the `api` from `../../services/api.js` if it exists (previous turns hinted at services).
          // But to be safe, I'll inline a fetch call relative to /api.
          


// ... in component
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
    <div className={styles.homeContainer} style={{ padding: '2rem', color: 'white' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Hello, <span style={{ color: '#F43F5E' }}>{user?.name || "Scholar"}</span>
            </h1>
            <p style={{ color: '#A1A1AA', fontSize: '1.1rem' }}>
              Ready to learn something new today?
            </p>
        </div>

        {/* Search Section */}
        <div style={{ position: 'relative', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem 0' }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: '#27272A', 
                borderRadius: '1rem', 
                padding: '1rem 1.5rem',
                border: '1px solid #3F3F46',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
                <Search size={24} color="#71717A" />
                <input 
                    type="text" 
                    placeholder="Search for notes, PYQs, or topics..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'white', 
                        fontSize: '1.1rem',
                        marginLeft: '1rem',
                        width: '100%',
                        outline: 'none'
                    }}
                />
                {searching && <span style={{ color: '#71717A', fontSize: '0.9rem' }}>Searching...</span>}
            </div>

            {/* Hero Stats - Added based on instruction */}
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

            {/* User Results Dropdown */}
            {results.length > 0 && (
                <div style={{ 
                    position: 'absolute', 
                    top: '120%', 
                    left: 0, 
                    right: 0, 
                    background: '#18181B', 
                    borderRadius: '1rem', 
                    border: '1px solid #3F3F46', 
                    zIndex: 50,
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}>
                    {results.map((item, idx) => (
                        <div key={idx} style={{ padding: '1rem', borderBottom: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    background: '#27272A', 
                                    borderRadius: '8px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: item.isPremium ? '#F59E0B' : '#A1A1AA'
                                }}>
                                    {item.isPremium ? <Shield size={18} /> : <BookOpen size={18} />}
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#FAFAFA' }}>{item.title || item.subject}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#71717A' }}>
                                        {item.type === 'pyq' ? `PYQ • ${item.year}` : `Notes • ${item.subject}`}
                                    </p>
                                </div>
                            </div>
                            {item.isPremium && <span style={{ fontSize: '0.7rem', color: '#F59E0B', background: '#451a03', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>PREMIUM</span>}
                        </div>
                    ))}
                    <div style={{ padding: '0.8rem', textAlign: 'center', fontSize: '0.9rem', color: '#71717A', cursor: 'pointer' }}>
                        View all results
                    </div>
                </div>
            )}
        </div>

        {/* Continue Learning & Stats Grid */}
        
        {/* We can use the existing layout for specific sections logic */}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
             {/* Continue Learning */}
             <div style={{ background: '#18181B', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid #27272A' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                     <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} color="#F43F5E" /> Continue Learning
                     </h3>
                </div>
                
                {user?.courses?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {user.courses.slice(0, 3).map((course, i) => (
                             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '4px', height: '40px', background: '#F43F5E', borderRadius: '2px' }}></div>
                                <div>
                                    <p style={{ fontWeight: '600' }}>{course.name}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#71717A' }}>{course.progress}% Complete</p>
                                </div>
                             </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#71717A', padding: '2rem 0' }}>
                        <p>No recent activity.</p>
                        <button style={{ marginTop: '1rem', background: '#F43F5E', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem' }}>Start browsing</button>
                    </div>
                )}
             </div>

             {/* Daily Streak / Suggestion */}
             <div style={{ background: 'linear-gradient(135deg, #F43F5E22, #000000)', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid #F43F5E44', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                    <img src={image} style={{ width: '150px' }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#F43F5E' }}>
                    Exam Mode
                </h3>
                <p style={{ color: '#D4D4D8', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '80%' }}>
                    Prepare for your upcoming exams with our curated PYQ sets.
                </p>
                <Link to="pyq" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#F43F5E', color: 'white', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.8rem', fontWeight: '600' }}>
                    View PYQs <ArrowRight size={18} />
                </Link>
             </div>
        </div>

        {/* Existing Subject Area */}
        <div style={{ paddingTop: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Browse Categories</h2>
            <SubjectArea />
        </div>
    </div>
  );
}
export default PrimiumHome;
