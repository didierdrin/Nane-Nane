import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="z-10">
          <h1 className="text-2xl font-bold text-nanenane-800">
            NANE<span className="text-lake-600">NANE</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                isActive(link.path)
                  ? isScrolled ? "text-lake-600 font-semibold" : "text-lake-300 font-semibold"
                  : isScrolled ? "text-gray-700 hover:text-lake-600" : "text-white/90 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* WhatsApp Button (Desktop) */}
        <div className="hidden md:block">
          <WhatsAppButton 
            text="Inquire Now" 
            phoneNumber="+255755823336" 
            className={`${
              isScrolled 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-white text-green-600 hover:bg-gray-100"
            } transition-colors`} 
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden z-50 focus:outline-none ${
            isScrolled ? "text-gray-900" : "text-white"
          }`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm">
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-50">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-800" />
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="flex flex-col items-center justify-center h-full px-4 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={`w-full text-center text-lg px-6 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-lake-100 text-lake-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-8 w-full max-w-xs">
                <WhatsAppButton 
                  text="Inquire Now" 
                  phoneNumber="+255755823336" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;