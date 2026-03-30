import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * Hook to ensure user has selected their year before accessing academic content.
 * Redirects to home if year is missing.
 */
export const useRequireYear = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && user && user.role === 'student' && !user.year) {
            toast.error("Please select your academic year first.");
            navigate('/home');
            setTimeout(() => {
                document.getElementById('yearBook')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [user, loading, navigate, location]);

    return { user, loading };
};
