import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "@/contexts/ContentContext";

export const AboutPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { content } = useContent();
  
  const aboutData = content?.explore?.about || {
    subtitle: "Nane Nane is a Tanzanian-led, tech-enabled fish company..."
  };

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
    
    const element = document.getElementById('about-preview');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-preview" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient relative inline-block">
              About Us
              <span className="absolute -bottom-2 left-0 w-24 h-1 bg-nanenane-500 rounded-full"></span>
            </h2>
            {aboutData.subtitle.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 mb-6 mt-8">
                {para}
              </p>
            ))}
            <Link 
              to="/about" 
              className="btn-outline inline-flex items-center group"
            >
              Learn More About Us
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className={`grid grid-cols-2 gap-4 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src="https://i.ibb.co/99C7q1CN/IMG-20250505-WA0023.jpg" 
                  alt="Fish farming operations" 
                  className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/lovable-uploads/f37b722f-f29c-47a0-bb56-f978b10828d6.png" 
                  alt="Cold chain facility" 
                  className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/lovable-uploads/5e9aa77d-45b3-43b3-a5d5-dd89952924d1.png" 
                  alt="Processing facility" 
                  className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src="https://i.ibb.co/1YwqyPwB/IMG-20250505-WA0019.jpg" 
                  alt="Distribution network" 
                  className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { useEffect, useState } from "react";

// const AboutPreview = () => {
//   const [isVisible, setIsVisible] = useState(false);
  
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
    
//     const element = document.getElementById('about-preview');
//     if (element) observer.observe(element);
    
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section id="about-preview" className="section-padding bg-white overflow-hidden">
//       <div className="container-custom">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient relative inline-block">
//               About Us
//               <span className="absolute -bottom-2 left-0 w-24 h-1 bg-nanenane-500 rounded-full"></span>
//             </h2>
//             <p className="text-gray-700 mb-6 mt-8">
//             Nane Nane is a Tanzanian-led, tech-enabled fish company solving protein deficiency and post-harvest loss across East Africa. We operate an integrated fish value chain—from cage-based fish farming and cold-chain aggregation, to value-added processing and smart distribution.

// Through our sustainable practices, we empower fishing communities, increase incomes, and deliver fresh, affordable, high-quality fish to urban households, retailers, and hospitality businesses.


//             </p>
//             <p className="text-gray-700 mb-8">
//             Our model blends ethical aquaculture & sustainable aggregation from fishers, clean technology, and circular economy innovation—turning waste into value and fish into hope.

// Fresh from the Lake. Made for Your Plate. Empowering communities, one fish at a time.
//             </p>
//             <Link 
//               to="/about" 
//               className="btn-outline inline-flex items-center group"
//             >
//               Learn More About Us
//               <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
          
//           <div className={`grid grid-cols-2 gap-4 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
//             <div className="space-y-4">
//               <div className="overflow-hidden rounded-lg shadow-md">
//                 <img 
//                   src="https://i.ibb.co/99C7q1CN/IMG-20250505-WA0023.jpg" 
//                   alt="Fish farming operations" 
//                   className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
//                 />
//               </div>
//               <div className="overflow-hidden rounded-lg shadow-md">
//                 <img 
//                   src="/lovable-uploads/f37b722f-f29c-47a0-bb56-f978b10828d6.png" 
//                   alt="Cold chain facility" 
//                   className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
//                 />
//               </div>
//             </div>
//             <div className="space-y-4 mt-8">
//               <div className="overflow-hidden rounded-lg shadow-md">
//                 <img 
//                   src="/lovable-uploads/5e9aa77d-45b3-43b3-a5d5-dd89952924d1.png" 
//                   alt="Processing facility" 
//                   className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
//                 />
//               </div>
//               <div className="overflow-hidden rounded-lg shadow-md">
//                 <img 
//                   src="https://i.ibb.co/1YwqyPwB/IMG-20250505-WA0019.jpg" 
//                   alt="Distribution network" 
//                   className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutPreview;
