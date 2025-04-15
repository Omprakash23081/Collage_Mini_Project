function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna
            sed, convallis ex.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section" id="contact">
          <h3>Contact Us</h3>
          <p>Address: KNLOGE PARCK-3 ,GREATER NOIDA, INDIA</p>
          <p>Phone: 9006920087</p>
          <p>Email: <a href="mailto:info@example.com">omprakashkumarglb@gmail.com</a></p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i>linkdin</a></li>
            <li><a href="#" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i>facebook</a></li>
            <li><a href="#" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i>instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 THE GLBANS. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;