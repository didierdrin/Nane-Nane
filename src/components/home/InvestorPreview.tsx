
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, BarChart2, Globe2, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const InvestorPreview = () => {
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
    
    const element = document.getElementById('investor-preview');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="investor-preview" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute top-0 text-lake-50 animate-float">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={isVisible ? 'animate-slide-in-left' : 'opacity-0'}>
            <div className="rounded-lg shadow-xl overflow-hidden relative group">
              <img 
                src="/lovable-uploads/c7399aee-b0e8-4134-b62a-768f9d2499b8.png" 
                alt="Fish farm aerial view" 
                className="w-full rounded-lg transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nanenane-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <div className={isVisible ? 'animate-slide-in-right' : 'opacity-0'}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient relative inline-block">
              Partner with Nane Nane
              <span className="absolute -bottom-2 left-0 w-24 h-1 bg-nanenane-500 rounded-full"></span>
            </h2>
            <p className="text-gray-700 mb-6 mt-6">
              Join our mission to revolutionize aquaculture in East Africa. Our pilot phase has already demonstrated success with an impressive 36% net profit margin, having generated $17,593 in revenue from an initial investment of just $8,533.
            </p>
            
            <Separator className="my-6" />
            
            {/* Investment Highlights */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start group transform transition-all duration-300 hover:translate-x-2">
                <div className="bg-nanenane-100 p-2 rounded-full mr-4 group-hover:bg-nanenane-200 transition-colors">
                  <TrendingUp className="h-5 w-5 text-nanenane-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">High Demand Market</h3>
                  <p className="text-gray-600 text-sm">Tanzania has a 480,000 tonnes fish deficit, creating enormous market potential for sustainable aquaculture.</p>
                </div>
              </div>
              
              <div className="flex items-start group transform transition-all duration-300 hover:translate-x-2">
                <div className="bg-nanenane-100 p-2 rounded-full mr-4 group-hover:bg-nanenane-200 transition-colors">
                  <BarChart2 className="h-5 w-5 text-nanenane-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Proven Business Model</h3>
                  <p className="text-gray-600 text-sm">Our pilot phase achieved 36% net profit margin with clear scaling strategy to reach 1000MT production by 2033.</p>
                </div>
              </div>
              
              <div className="flex items-start group transform transition-all duration-300 hover:translate-x-2">
                <div className="bg-nanenane-100 p-2 rounded-full mr-4 group-hover:bg-nanenane-200 transition-colors">
                  <Globe2 className="h-5 w-5 text-nanenane-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Government Support</h3>
                  <p className="text-gray-600 text-sm">The Tanzanian government actively promotes sustainable aquaculture as a national priority.</p>
                </div>
              </div>
              
              <div className="flex items-start group transform transition-all duration-300 hover:translate-x-2">
                <div className="bg-nanenane-100 p-2 rounded-full mr-4 group-hover:bg-nanenane-200 transition-colors">
                  <Users className="h-5 w-5 text-nanenane-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Social Impact</h3>
                  <p className="text-gray-600 text-sm">Currently supporting 50 women vendors and creating employment with 1 full-time and 3 part-time positions.</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/invest" 
              className="btn-primary bg-nanenane-600 hover:bg-nanenane-700 inline-flex items-center group"
            >
              Explore Investment Opportunities
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorPreview;
