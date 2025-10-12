import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-nanenane-900 text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">
              NANE<span className="text-lake-400">NANE</span>
            </h2>
            <p className="text-gray-300 mb-4">
              A Tanzanian-led, tech-enabled fish company solving protein deficiency and post-harvest loss across East Africa.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-lake-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-lake-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-lake-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link></li>
              {/* <li><Link to="/tourism" className="text-gray-300 hover:text-white transition-colors">Tourism</Link></li>
              <li><Link to="/invest" className="text-gray-300 hover:text-white transition-colors">Invest With Us</Link></li> */}
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Fish Farming</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Cold-Chain Aggregation</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Value-Added Processing</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Smart Distribution</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Kongolo, Mwanza, Tanzania</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">+255 755 823 336</span>
              </li>
              {/* <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">mohammedatul7@gmail.com</span>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} Nane Nane Aquaculture & Sustainable aggregation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
