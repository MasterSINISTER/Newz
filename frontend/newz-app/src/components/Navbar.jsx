import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"
function Navbar() {



  const handleWhyHere=() => {
    const percentage = 100; // Change this to the desired percentage
    const windowHeight = window.innerHeight;
    const section = document.querySelector(".newz-section");
    const sectionOffsetTop = section.offsetTop;
    const targetScrollPosition =
      sectionOffsetTop - windowHeight * (1 - percentage / 100);

    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });
  }



  const handleWhatDoWeDo=() => {
    const percentage = 100; // Change this to the desired percentage
    const windowHeight = window.innerHeight;
    const section = document.querySelector(".newz-section-why");
    const sectionOffsetTop = section.offsetTop;
    const targetScrollPosition =
      sectionOffsetTop - windowHeight * (1 - percentage / 100);

    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });
  }

  
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
          <li className='links-nav' onClick={handleWhyHere}><Link to="#">Why ?</Link></li>
          <li className='links-nav' onClick={handleWhatDoWeDo}><Link to="#">What !</Link></li>
          <li className='links-nav'><Link to="/contact">Contact</Link></li>
        </ul>
        </div>
       
      </nav>
      </div>
    </>
  )
}

export default Navbar
