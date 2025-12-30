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

  // Parse the title to handle the line break and styling
  const titleLines = heroData.title.split('\n');
  const heroImages = heroData.images?.map((img: any) => img.url) || images;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
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
