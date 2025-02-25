import React from "react";

import "../styles/Footer.css";
function Footer() {
  return (
    <>
      <main class="bg-white rounded-4 p-5">
        <section class="row row-cols-lg-4 row-cols-sm-2 row-cols-md-3 mb-5 g-4">
          <div class="section-1 me-4">
            <h5 class="mb-3">Explore</h5>
            <a href="#" class="text-decoration-none d-block mb-2">
              New uploads
            </a>
            <a href="#" class="text-decoration-none d-block mb-2">
              Popular designs
            </a>
            <a href="#" class="text-decoration-none">
              Contributors
            </a>
          </div>

          <div class="section-2">
            <h5 class="mb-3">Site</h5>
            <a href="#" class="text-decoration-none d-block mb-2">
              License
            </a>
            <a href="#" class="text-decoration-none d-block mb-2">
              Articles
            </a>
            <a href="#" class="text-decoration-none d-block mb-2">
              About
            </a>
            <a href="#" class="text-decoration-none d-block mb-2">
              Support
            </a>
            <a href="#" class="text-decoration-none">
              Sponsors
            </a>
          </div>

          <div class="section-3">
            <h5 class="mb-3">Other products</h5>
            <a href="#" class="text-decoration-none">
              Boardme
            </a>
          </div>

          <div class="section-4">
            <h3 class="mb-3">1362</h3>
            <a href="#" class="text-decoration-none mb-5 d-block">
              Design files uploaded
            </a>

            <h5 class="mb-3">Follow us</h5>
            <i class="fa-brands fa-instagram me-3"></i>
            <i class="fa-brands fa-twitter"></i>
          </div>
        </section>

        <section class="footer d-flex justify-content-between">
          <span class="fw-bold">Legal</span>
          <span class="copyright">
            © 2021 UI Design Daily All rights reserved
          </span>
        </section>
      </main>
    </>
  );
}

export default Footer;
