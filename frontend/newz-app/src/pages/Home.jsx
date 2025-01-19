import React, { useEffect } from "react";
import "../styles/Home.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const readingImage = document.querySelector(".img-home");
      const newzHeadings = document.querySelectorAll(".newz-heading");
      if (readingImage && newzHeadings) {
        const { scrollY } = window;
        readingImage.style.transform = `translateX(${scrollY * 0.5}px)`;
        newzHeadings.forEach((heading, index) => {
          heading.style.transform = `translateX(${scrollY * -0.5}px)`;
        });
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <Navbar/>
      <div className="home-container">
        <div>
          <h1 className="newz-heading">NEWZ</h1>
        </div>

        <img
          src="https://cdn.dribbble.com/users/1319343/screenshots/14584578/media/e6517d247bf8d46e0a9b722b8894023d.gif"
          className="img-home"
          alt="Scrolling animation"
        />
      </div>
      <div>
        <button className="btn-scroll">GET STARTED</button>
      </div>
      <div>
        <section className="newz-section">
          <h1 className="about-us-heading" >Why here ?</h1>
          <div className="about-us-container">
            <img
              src="https://cdn.dribbble.com/users/456842/screenshots/3454199/media/853180a8bf6cf4f8751d97f3ef17572c.gif"
              className="about-us-image"
              alt="Scrolling animation"
            />
            <h3 className="about-us-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
              cupiditate doloremque necessitatibus architecto odit vero
              exercitationem quo voluptas tempore repellat, distinctio quibusdam
              perspiciatis iusto, incidunt eveniet. Laudantium unde itaque
              eveniet?
            </h3>
          </div>
        </section>
      </div>
      <div>
        <section className="newz-section">
          <h1 className="about-us-heading" >What we do ?</h1>
          <div className="about-us-container">
          <h3 className="about-us-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
              cupiditate doloremque necessitatibus architecto odit vero
              exercitationem quo voluptas tempore repellat, distinctio quibusdam
              perspiciatis iusto, incidunt eveniet. Laudantium unde itaque
              eveniet?
            </h3>
            <img
              src="https://cdn.dribbble.com/users/349167/screenshots/6643573/walk_800x600.gif"
              className="about-us-image"
              alt="Scrolling animation"
            />
            
          </div>
        </section>
      </div>
          <Footer/>
    </>
  );
}

export default Home;
