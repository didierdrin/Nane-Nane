import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Spinner } from "@/components/ui/spinner";

const productCategories = [
  {
    id: "tilapia",
    name: "Fresh Tilapia Fish",
    description: "Sustainably farm-raised tilapia from our cage-based farming operations in Lake Victoria.",
    buttonText: "Order Fresh Tilapia Fish",
    whatsappMessage: "Hello, I'm interested in ordering fresh tilapia fish, my name is ",
    image: "https://www.globalseafood.org/wp-content/uploads/2018/12/STONEHAM-tilapia-Pic-0.jpg",
    features: [
      "Sustainably farm-raised in Lake Victoria",
      "High in protein and essential nutrients",
      "Provides income to local communities",
      "Available in various sizes with delivery options"
    ]
  },
  {
    id: "nilePerch",
    name: "Fresh Nile Perch",
    description: "Premium quality Nile Perch ethically sourced through our cold-chain aggregation network from local fishers.",
    buttonText: "Order Fresh Nile Perch",
    whatsappMessage: "Hello, I'm interested in Nile Perch, my name is ",
    image: "https://a-z-animals.com/media/2022/06/shutterstock_2100233851-1024x614.jpg",
    features: [
      "Ethically sourced from local fishing communities",
      "Processed through our cold-chain to ensure freshness",
      "Rich in protein and omega-3 fatty acids",
      "Supports sustainable fishing practices"
    ]
  }
];

const ShopPreview = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('shop-preview');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="shop-preview" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute top-0 text-nanenane-50 animate-float">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient relative inline-block">
            Fresh From The Lake
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-nanenane-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Through our integrated fish value chain, we deliver fresh, affordable, high-quality fish while empowering local fishing communities and reducing post-harvest loss.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 animate-fade-in delay-200">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1.5 relative z-10">
            {productCategories.map((category) => (
              <button
                key={category.id}
                className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-md ${
                  activeCategory.id === category.id
                    ? "bg-nanenane-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Display Active Category */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block mb-4">
              <Spinner size="lg" />
            </div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`order-2 md:order-1 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-4 text-nanenane-800">
                {activeCategory.name}
              </h3>
              <p className="text-gray-700 mb-8">
                {activeCategory.description}
              </p>
              
              {/* Key Features/Benefits */}
              <ul className="space-y-3 mb-8">
                {activeCategory.features.map((feature, index) => (
                  <li key={index} className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                    <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <WhatsAppButton 
                  text={activeCategory.buttonText}
                  phoneNumber="+255755823336"
                  message={activeCategory.whatsappMessage}
                  className="bg-green-600 hover:bg-green-700 flex items-center justify-center group"
                />
                <Link to="/" className="btn-outline flex items-center justify-center gap-2 group">
                  View All Products
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className={`order-1 md:order-2 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="rounded-lg shadow-xl overflow-hidden group">
                <img 
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopPreview;
