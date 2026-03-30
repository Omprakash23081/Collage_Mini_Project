import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './RoleSelection.module.css';
import { AuthContext } from '../../context/AuthContext.jsx';
import { 
  UserCircle, 
  ChefHat, 
  BookOpen, 
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    if (user && user.lastVisitedUrl) {
      const path = user.lastVisitedUrl;
      if (path !== '/' && path !== '/login' && path !== '/home') {
        navigate(path);
      }
    }
  }, [user, navigate]);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access notes, PYQs, and place orders for food or printing.',
      icon: <UserCircle size={48} />,
      path: '/login?role=student',
      color: 'var(--neon-blue)'
    },
    {
      id: 'canteen_vendor',
      title: 'Canteen Vendor',
      description: 'Manage your menu, track food orders, and view earnings.',
      icon: <ChefHat size={48} />,
      path: '/login?role=canteen_vendor',
      color: 'var(--neon-magenta)'
    },
    {
      id: 'stationery_vendor',
      title: 'Stationery Vendor',
      description: 'Manage stationery items and handle student print requests.',
      icon: <BookOpen size={48} />,
      path: '/login?role=stationery_vendor',
      color: 'var(--neon-cyan)'
    },
    {
      id: 'teacher',
      title: 'Teacher/Admin',
      description: 'Manage institutional data, notices, and academic content.',
      icon: <ShieldCheck size={48} />,
      path: '/login?role=teacher',
      color: 'var(--neon-purple)'
    }
  ];

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.title}>Welcome to <span>StudySharp</span></h1>
        <p className={style.subtitle}>Please select your role to continue</p>
      </header>

      {user && (
        <div className={style.dashboardButtons}>
          <button 
            className={style.goHomeBtn} 
            onClick={() => navigate('/home')}
          >
            <ArrowLeft size={16} /> Normal
          </button>
          <button 
            className={`${style.goHomeBtn} ${style.premiumBtn}`} 
            onClick={() => navigate('/primum')}
          >
            Premium <ArrowRight size={16} />
          </button>
        </div>
      )}

      <div className={style.grid}>
        {roles.map((role) => (
          <div 
            key={role.id} 
            className={style.card}
            onClick={() => navigate(role.path)}
            style={{ '--accent-color': role.color }}
          >
            <div className={style.iconWrapper}>
              {role.icon}
            </div>
            <h2 className={style.cardTitle}>{role.title}</h2>
            <p className={style.cardDescription}>{role.description}</p>
            <div className={style.cardFooter}>
              <span>Enter Portal</span>
              <div className={style.arrow}>→</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
