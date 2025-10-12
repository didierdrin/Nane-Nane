import { useState } from "react";
import { CheckCircle2, Calendar, MapPin } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

// Experience package data
const experiencePackages = [
  {
    id: 1,
    title: "Day Visit & Farm Tour",
    duration: "Full Day (8 hours)",
    price: "45,000 TZS per person",
    image: "/lovable-uploads/729e8505-eccd-4be6-9bae-3632c3e99d14.png",
    description: "Explore our aquaculture operations with guided tours of the fish cages. Includes boat ride, farm tour, and lunch with fresh fish.",
    features: [
      "Guided tour of fish farm operations",
      "Boat ride on Lake Victoria",
      "Fresh fish lunch at our lakeside restaurant",
      "Fish feeding experience",
      "Transportation from Mwanza city (optional add-on)"
    ],
    whatsappMessage: "Hello, I'd like to book the Day Visit & Farm Tour package."
  },
  {
    id: 2,
    title: "Overnight Eco-Stay",
    duration: "2 Days, 1 Night",
    price: "120,000 TZS per person",
    image: "/lovable-uploads/f37b722f-f29c-47a0-bb56-f978b10828d6.png",
    description: "Immerse yourself in the lake environment with our overnight package. Experience sunrise on Lake Victoria and participate in morning harvesting.",
    features: [
      "Accommodation in lakeside cottages",
      "All meals included (dinner, breakfast, lunch)",
      "Evening boat ride and sunset viewing",
      "Morning fish harvesting experience",
      "Guided tour of fish farm operations",
      "Free time for swimming and relaxation"
    ],
    whatsappMessage: "Hello, I'd like to book the Overnight Eco-Stay package."
  },
  {
    id: 3,
    title: "Family Adventure Package",
    duration: "Full Day (8 hours)",
    price: "160,000 TZS for family of 4",
    image: "/lovable-uploads/d3253bc3-2724-4f9b-aad8-99dbb62a14a3.png",
    description: "Perfect for families with children! Learn about aquaculture with kid-friendly activities and enjoy a fun day by the lake.",
    features: [
      "Child-friendly farm tour and fish feeding",
      "Family boat ride on Lake Victoria",
      "Fish-themed crafts and activities for children",
      "Family lunch with options for children",
      "Swimming time (supervised)",
      "Family photo opportunity with beautiful lake backdrop"
    ],
    whatsappMessage: "Hello, I'd like to book the Family Adventure Package."
  },
  {
    id: 4,
    title: "Educational Group Tour",
    duration: "Half Day (4 hours)",
    price: "25,000 TZS per student (min. 10 students)",
    image: "/lovable-uploads/729e8505-eccd-4be6-9bae-3632c3e99d14.png",
    description: "Specially designed for school groups and educational institutions to learn about sustainable aquaculture and lake ecosystems.",
    features: [
      "Educational presentation on aquaculture",
      "Guided tour of farm operations",
      "Interactive Q&A session with aquaculture experts",
      "Educational materials provided",
      "Light refreshments included",
      "Group boat ride (optional add-on)"
    ],
    whatsappMessage: "Hello, I'd like to book the Educational Group Tour."
  }
];

// Activity data
const activities = [
  {
    title: "Fish Cage Tours",
    description: "Get an up-close look at our innovative fish cages and learn about modern aquaculture techniques.",
    image: "/lovable-uploads/e258c139-223e-4caf-a42a-fb8013ff0482.png"
  },
  {
    title: "Boat Excursions",
    description: "Explore the beautiful waters of Lake Victoria with guided boat tours around our farm and nearby areas.",
    image: "/lovable-uploads/d3253bc3-2724-4f9b-aad8-99dbb62a14a3.png"
  },
  {
    title: "Fish Harvesting",
    description: "Participate in the exciting process of harvesting fish from our cages - a truly hands-on experience!",
    image: "/lovable-uploads/729e8505-eccd-4be6-9bae-3632c3e99d14.png"
  },
  {
    title: "Farm-to-Table Dining",
    description: "Enjoy delicious meals prepared with freshly harvested fish from our farm, showcasing local cuisine.",
    image: "/lovable-uploads/f333ee8f-fab3-4dfa-a4c5-2de2569e4df9.png"
  },
  {
    title: "Lakeside Relaxation",
    description: "Unwind by the shore of Lake Victoria with breathtaking views and peaceful surroundings.",
    image: "/lovable-uploads/2034a942-746d-478f-9e8c-072c717c10fc.png"
  },
  {
    title: "Sunrise Experiences",
    description: "Wake up early to witness stunning sunrises over Lake Victoria - perfect for photography enthusiasts.",
    image: "/lovable-uploads/f37b722f-f29c-47a0-bb56-f978b10828d6.png"
  }
];

const Tourism = () => {
  const [selectedPackage, setSelectedPackage] = useState(experiencePackages[0]);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/f37b722f-f29c-47a0-bb56-f978b10828d6.png" 
              alt="Lake Victoria" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-nanenane-900/70"></div>
          </div>
          
          <div className="container-custom relative z-10 py-24 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Aqua-Tourism Experiences</h1>
            <p className="text-xl max-w-2xl">
              Discover the perfect blend of education, adventure, and relaxation at our unique fish farm and eco-resort on the shores of Lake Victoria.
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Experience Aquaculture Tourism</h2>
                <p className="text-gray-700 mb-4">
                  At Nane Nane, we offer a one-of-a-kind tourism experience that combines sustainable aquaculture with the natural beauty of Lake Victoria. Our visitors get a unique opportunity to learn about modern fish farming while enjoying the serene lake environment.
                </p>
                <p className="text-gray-700 mb-6">
                  Located just a 2-hour drive from Serengeti National Park, our eco-farm is the perfect addition to your Tanzania safari adventure or a standalone destination for those interested in sustainable agriculture and natural experiences.
                </p>
                
                <div className="flex items-center mb-4">
                  <MapPin className="text-nanenane-600 mr-2" size={20} />
                  <span className="text-gray-700">Lake Victoria, Mwanza Region, Tanzania</span>
                </div>
                
                <WhatsAppButton 
                  text="Inquire About Bookings" 
                  phoneNumber="+255755823336" 
                  message="Hello, I'd like to inquire about tourism experiences at Nane Nane."
                  className="bg-green-600 hover:bg-green-700 mt-2" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/lovable-uploads/d3253bc3-2724-4f9b-aad8-99dbb62a14a3.png" 
                  alt="Boat on Lake Victoria" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img 
                  src="/lovable-uploads/729e8505-eccd-4be6-9bae-3632c3e99d14.png" 
                  alt="Fish farm" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img 
                  src="/lovable-uploads/f333ee8f-fab3-4dfa-a4c5-2de2569e4df9.png" 
                  alt="Farm-to-table dining" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img 
                  src="/lovable-uploads/2034a942-746d-478f-9e8c-072c717c10fc.png" 
                  alt="Lake Victoria sunset" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-16 bg-nanenane-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Experiences & Activities</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden card-hover"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-nanenane-800">{activity.title}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Experience Packages</h2>
            
            {/* Package Selection Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {experiencePackages.map((pkg) => (
                <button
                  key={pkg.id}
                  className={`px-6 py-3 rounded-md transition-colors ${
                    selectedPackage.id === pkg.id
                      ? "bg-nanenane-600 text-white"
                      : "bg-nanenane-100 text-nanenane-800 hover:bg-nanenane-200"
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.title}
                </button>
              ))}
            </div>
            
            {/* Package Details */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-full">
                  <img 
                    src={selectedPackage.image}
                    alt={selectedPackage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold mb-2 text-nanenane-800">{selectedPackage.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center bg-nanenane-50 px-3 py-1 rounded-full">
                      <Calendar size={16} className="text-nanenane-600 mr-2" />
                      <span className="text-sm text-nanenane-800">{selectedPackage.duration}</span>
                    </div>
                    <div className="bg-lake-50 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-lake-800">{selectedPackage.price}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{selectedPackage.description}</p>
                  
                  <h4 className="font-semibold text-nanenane-800 mb-3">Package Includes:</h4>
                  <ul className="space-y-2 mb-8">
                    {selectedPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 size={18} className="text-lake-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <WhatsAppButton 
                    text="Book This Package" 
                    phoneNumber="+255755823336" 
                    message={selectedPackage.whatsappMessage}
                    className="bg-green-600 hover:bg-green-700" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serengeti Proximity Section */}
        <section className="py-16 bg-nanenane-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Near Serengeti National Park</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Combine your safari adventure with our unique aqua-tourism experience. 
              Just a 2-hour drive from Serengeti National Park, Nane Nane is the perfect 
              addition to your Tanzania itinerary.
            </p>
            <WhatsAppButton 
              text="Plan Your Visit" 
              phoneNumber="+255755823336" 
              message="Hello, I'm planning a trip that includes Serengeti and would like to visit Nane Nane."
              variant="outline" 
              className="border-white text-nanenane-500 hover:bg-white hover:text-nanenane-900" 
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Tourism;
