
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Waves, Sun, Fish, Utensils } from "lucide-react";

const experienceTypes = [
  {
    id: "farm-tours",
    icon: <Fish className="h-8 w-8 text-white" />,
    title: "Farm Tours",
    description: "Explore our innovative fish farming operations on Lake Victoria. Learn about sustainable aquaculture practices and see our fish cages up close.",
    image: "/lovable-uploads/729e8505-eccd-4be6-9bae-3632c3e99d14.png"
  },
  {
    id: "boat-rides",
    icon: <Waves className="h-8 w-8 text-white" />,
    title: "Boat Rides",
    description: "Enjoy scenic boat rides on Lake Victoria, taking in the breathtaking landscapes and watching local wildlife while our guides share interesting facts about the lake ecosystem.",
    image: "/lovable-uploads/d3253bc3-2724-4f9b-aad8-99dbb62a14a3.png"
  },
  {
    id: "dining",
    icon: <Utensils className="h-8 w-8 text-white" />,
    title: "Farm-to-Table Dining",
    description: "Savor delicious meals prepared with fresh fish from our farm. Experience authentic local cuisine with a modern twist in our lakeside restaurant.",
    image: "/lovable-uploads/f333ee8f-fab3-4dfa-a4c5-2de2569e4df9.png"
  },
  {
    id: "sunrise",
    icon: <Sun className="h-8 w-8 text-white" />,
    title: "Sunrise Experiences",
    description: "Wake up to stunning Lake Victoria sunrises and participate in morning fish harvesting activities. A unique experience combining nature and aquaculture.",
    image: "/lovable-uploads/f37b722f-f29c-47a0-bb56-f978b10828d6.png"
  }
];

const TourismPreview = () => {
  const [activeExperience, setActiveExperience] = useState(experienceTypes[0]);

  return (
    <section className="section-padding bg-lake-50 relative overflow-hidden">
      {/* Decorative wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute top-0 text-white animate-float">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="container-custom">
        <div className="text-center mb-16 pt-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient relative inline-block">
            Aqua-Tourism Experiences
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-nanenane-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Discover a unique blend of aquaculture and tourism on the shores of Lake Victoria, just a short drive from Serengeti National Park.
          </p>
        </div>

        {/* Experience Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in delay-200">
          {experienceTypes.map((experience, index) => (
            <button
              key={experience.id}
              className={`p-4 rounded-lg transition-all duration-300 transform ${
                activeExperience.id === experience.id
                  ? "bg-nanenane-600 shadow-lg scale-105"
                  : "bg-nanenane-100 hover:bg-nanenane-200 hover:scale-105"
              }`}
              onClick={() => setActiveExperience(experience)}
            >
              <div className="flex flex-col items-center">
                <div className={`p-3 rounded-full mb-3 transform transition-all duration-300 ${
                  activeExperience.id === experience.id
                    ? "bg-nanenane-500 scale-110"
                    : "bg-nanenane-400"
                }`}>
                  {experience.icon}
                </div>
                <span className={`font-medium ${
                  activeExperience.id === experience.id
                    ? "text-white"
                    : "text-gray-800"
                }`}>
                  {experience.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Display Active Experience */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-scale-in delay-300">
          <div className="grid md:grid-cols-2">
            <div className="h-full relative overflow-hidden group">
              <img 
                src={activeExperience.image}
                alt={activeExperience.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-nanenane-800">
                {activeExperience.title}
              </h3>
              <p className="text-gray-700 mb-8">
                {activeExperience.description}
              </p>
              <div className="mt-auto">
                <Link 
                  to="/tourism" 
                  className="btn-primary bg-nanenane-600 hover:bg-nanenane-700 inline-flex items-center"
                >
                  Explore Experiences
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center animate-fade-in delay-400">
          <p className="text-gray-700 mb-4">
            <strong>Located just 2 hours from Serengeti National Park</strong> - 
            Make Nane Nane part of your Tanzania adventure!
          </p>
          <Link 
            to="/contact" 
            className="btn-outline inline-flex items-center"
          >
            Inquire About Bookings
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TourismPreview;
