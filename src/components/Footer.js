import React from 'react'
import '../styling/Footer.css'

function Footer () {
  return (
    <div className="footer">
      <div className="empty-footer-div"></div>
      <div className="footer-links">
        <a className="footer-link" href="https://github.com/nsemmler" target="_blank"><i class="fab fa-2x fa-github"></i></a>
        <a className="footer-link" href="https://www.linkedin.com/in/natesemmler/" target="_blank"><i class="fab fa-2x fa-linkedin"></i></a>
      </div>
      <div className="copyright-div">
        <p className="copyright">Ⓒ 2018 Nate Semmler</p>
      </div>
    </div>
  )
}

export default Footer
