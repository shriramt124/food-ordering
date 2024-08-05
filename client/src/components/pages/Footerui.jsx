import React from 'react';

const Footerui = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Contact Us Section */}
        <div className="text-center">
          <h2 className="text-xl mb-2">Contact Us</h2>
          <p><span role="img" aria-label="location">📍</span> Location</p>
          <p><span role="img" aria-label="phone">📞</span> Call +01 1234567890</p>
          <p><span role="img" aria-label="email">📧</span> demo@gmail.com</p>
        </div>

        {/* Feane Section */}
        <div className="text-center">
          <h2 className="text-xl mb-2">Feane</h2>
          <p>Necessary, making this the first true generator on the Internet.</p>
          <p>It uses a dictionary of over 200 Latin words, combined with</p>
          <div className="flex justify-center mt-2 space-x-3">
            <a href="#" aria-label="Facebook" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" aria-label="Instagram" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Pinterest" className="text-white hover:text-gray-400">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="text-center">
          <h2 className="text-xl mb-2">Opening Hours</h2>
          <p>Everyday</p>
          <p>10.00 Am - 10.00 Pm</p>
        </div>
      </div>

      <div className="container mx-auto text-center mt-8">
        <p>© 2024 All Rights Reserved By Free Html Templates</p>
        <p>© Distributed By ThemeWagon</p>
      </div>
    </footer>
  );
};

export default Footerui;
