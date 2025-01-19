import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"
function Navbar() {
    useEffect(() => {
        const handleScroll = () => {
            const navbarContainer = document.querySelector(".navbar-container");
            if (navbarContainer) {
                const { scrollY } = window;
                const scale = Math.max(0.5, 1 - scrollY * 0.001);
                navbarContainer.style.transform = `scale(${scale})`;
            }
        }
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
  return (
    <>
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-logo">
          <ul className="nav-links">
          <li className='links-nav'><Link to="/">Home</Link></li>
          <li className='links-nav'><Link to="/login">Explore</Link></li>
          <li className='links-nav'><Link to="/contact">Contact</Link></li>
        </ul>
        </div>
       
      </nav>
      </div>
    </>
  )
}

export default Navbar
