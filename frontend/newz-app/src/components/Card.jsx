import React from "react";
import "../styles/Card.css";

function Card() {
  return (
    <>
      <div class="card">
        <div class="card-image"></div>
        <p class="card-title">Card title</p>
        <p class="card-body">
          Nullam ac tristique nulla, at convallis quam. Integer consectetur mi
          nec magna tristique, non lobortis.
        </p>
        <p class="footer">
          Written by <span class="by-name">John Doe</span> on{" "}
          <span class="date">25/05/23</span>
        </p>
      </div>
    </>
  );
}

export default Card;
