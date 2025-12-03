import { ArrowRight, Fish, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContent } from "@/contexts/ContentContext";

const images = [
  "https://i.ibb.co/xth1LYzj/IMG-20250505-WA0038.jpg",
  "https://i.ibb.co/6JZfVVS9/IMG-20250505-WA0035.jpg",
  "https://i.ibb.co/1fQv2dxR/IMG-20250505-WA0039.jpg",
  "https://i.ibb.co/mCSQPnd1/IMG-20250505-WA0034.jpg",
  "https://i.ibb.co/xth1LYzj/IMG-20250505-WA0036.jpg",
  "https://i.ibb.co/6JZfVVS9/IMG-20250505-WA0030.jpg",
  "https://i.ibb.co/1fQv2dxR/IMG-20250505-WA0031.jpg",
  "https://i.ibb.co/mCSQPnd1/IMG-20250505-WA0029.jpg",
  "https://i.ibb.co/xth1LYzj/IMG-20250505-WA0027.jpg",
  "https://i.ibb.co/6JZfVVS9/IMG-20250505-WA0018.jpg",
  "https://i.ibb.co/1fQv2dxR/IMG-20250505-WA0019.jpg",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { content } = useContent();

  const heroData = content?.explore?.hero || {
    title: "Fresh from Lake Victoria\nMade for Your Plate"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Parse the title to handle the line break and styling
  const titleLines = heroData.title.split('\n');

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              transform: `scale(${index === currentImageIndex ? 1 : 1.05})`,
              transition: 'transform 10s ease-out'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line.split(' ').map((word, wordIndex) => {
                    if (word === 'Fresh') {
                      return <span key={wordIndex} className="text-lime-300">Fresh </span>;
                    } else if (word === 'Made') {
                      return <span key={wordIndex} className="text-cyan-300">Made </span>;
                    } else {
                      return word + (wordIndex < line.split(' ').length - 1 ? ' ' : '');
                    }
                  })}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            
            <p className="text-xl text-white/90 mb-8 flex items-center gap-3">
              <Fish className="text-amber-300" size={24} />
              <span>Empowering communities, one fish at a time</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/" 
                className="btn-primary flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-lime-600 hover:from-cyan-700 hover:to-lime-700 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Order Now <ArrowRight size={20} />
              </Link>
              
              <div className="flex items-center gap-2 text-white/80">
                <Truck className="text-amber-400" />
                <span>Get your Fish delivered to you.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden z-0">
      </div>
    </div>
  );
};

export default Hero;

// import { ArrowRight, Fish, Truck } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// const images = [
//   "https://i.ibb.co/xth1LYzj/IMG-20250505-WA0038.jpg",
//   "https://i.ibb.co/6JZfVVS9/IMG-20250505-WA0035.jpg",
//   "https://i.ibb.co/1fQv2dxR/IMG-20250505-WA0039.jpg",
//   "https://i.ibb.co/mCSQPnd1/IMG-20250505-WA0034.jpg",
//   "https://i.ibb.co/xth1LYzj/IMG-20250505-WA0036.jpg",
//   "https://i.ibb.co/6JZfVVS9/IMG-20250505-WA0030.jpg",
//   "https://i.ibb.co/1fQv2dxR/IMG-20250505-WA0031.jpg",
//   "https://i.ibb.co/mCSQPnd1/IMG-20250505-WA0029.jpg",
//   "https://i.ibb.co/xth1LYzj/IMG-20250505-WA0027.jpg",
//   "https://i.ibb.co/6JZfVVS9/IMG-20250505-WA0018.jpg",
//   "https://i.ibb.co/1fQv2dxR/IMG-20250505-WA0019.jpg",
// ];

// const Hero = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative h-screen min-h-[600px] overflow-hidden">
//       {/* Parallax Background Slideshow */}
//       <div className="absolute inset-0 z-0">
//         {images.map((image, index) => (
//           <div 
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//               index === currentImageIndex ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               backgroundImage: `url(${image})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundAttachment: 'fixed',
//               transform: `scale(${index === currentImageIndex ? 1 : 1.05})`,
//               transition: 'transform 10s ease-out'
//             }}
//           />
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 h-full flex items-center">
//         <div className="container mx-auto px-6">
//           <div className="max-w-2xl backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               <span className="text-lime-300">Fresh</span> from Lake Victoria<br/>
//               <span className="text-cyan-300">Made</span> for Your Plate
//             </h1>
            
//             <p className="text-xl text-white/90 mb-8 flex items-center gap-3">
//               <Fish className="text-amber-300" size={24} />
//               <span>Empowering communities, one fish at a time</span>
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link 
//                 to="/" 
//                 className="btn-primary flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-lime-600 hover:from-cyan-700 hover:to-lime-700 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
//               >
//                 Order Now <ArrowRight size={20} />
//               </Link>
              
//               <div className="flex items-center gap-2 text-white/80">
//                 <Truck className="text-amber-400" />
//                 <span>Get your Fish delivered to you.</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Slide Indicators */}
//       {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentImageIndex(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentImageIndex 
//                 ? "bg-lime-400 scale-125" 
//                 : "bg-white/50 hover:bg-white/80"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div> */}
      
//       {/* Animated Waves */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden z-0">
//         {/* <svg 
//           viewBox="0 0 1200 120" 
//           className="w-full h-full"
//           preserveAspectRatio="none"
//         >
//           <path 
//             fill="white" 
//             d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
//             className="opacity-25"
//           ></path>
//           <path 
//             fill="white" 
//             d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
//             className="opacity-50"
//           ></path>
//           <path 
//             fill="white" 
//             d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
//           ></path>
//         </svg> */}
//       </div>
//     </div>
//   );
// };

// export default Hero;