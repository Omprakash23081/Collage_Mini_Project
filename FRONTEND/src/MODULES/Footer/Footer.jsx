import styles from './Footer.module.css';
import logo from '../PHOTO/StudySharpLogo.png';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        
        {/* Brand Section */}
        <div className={styles.section}>
          <div className={styles.footerLogo}>
             <img src={logo} alt="StudySharp" />
             <span className={styles.brandText}>StudySharp</span>
          </div>
          <p className={styles.description}>
            Empowering students with premium resources, notes, and tools for academic excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}><a href="#" className={styles.link}>Home</a></li>
            <li className={styles.linkItem}><a href="#" className={styles.link}>About</a></li>
            <li className={styles.linkItem}><a href="#" className={styles.link}>Contact</a></li>
            <li className={styles.linkItem}><a href="#" className={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Contact Us</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
                <span className={styles.link}>KNLOGE PARCK-3, GREATER NOIDA, INDIA</span>
            </li>
            <li className={styles.linkItem}>
                <span className={styles.link}>+91 9006920087</span>
            </li>
            <li className={styles.linkItem}>
                <a href="mailto:omprakashkumarglb@gmail.com" className={styles.link}>omprakashkumarglb@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://github.com/Omprakash23081" target="_blank" rel="noreferrer" className={styles.socialIcon}>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>

      </div>

      <div className={styles.copyright}>
        <p>&copy; 2025 StudySharp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
