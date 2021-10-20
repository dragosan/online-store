import React from "react"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer id="main-footer" className="footer">
      <div className="footer-container">
        <div>
          <h2>Fashion</h2>
          <p>All you wanna buy in one place.</p>
        </div>
        <div>
          <h3>Follow us on Social Media</h3>
          <div className="social">
            <ul>
              <li>
                <a href="http://www.facebook.com">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="http://www.twitter.com" target="_blank">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="mailto:donvader77@gmail" target="_blank">
                  <i className="fas fa-envelope-square fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="http://www.instagram.com" target="_blank">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div>
          <h3>Site Links</h3>
          <ul className="list">
            <li>
              <a href="!#">Help & Support</a>
            </li>
            <li>
              <a href="!#">Privacy Policy</a>
            </li>
            <li>
              <a href="!#">About Us</a>
            </li>
            <li>
              <a href="!#">Contact</a>
            </li>
          </ul>
        </div> */}
        <div>
          <h2>Join Our Club</h2>
          <p>We have a lot of great products and offer , come and join us!</p>
        </div>
        <div>
          <p>Copyright &copy; 2019, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
