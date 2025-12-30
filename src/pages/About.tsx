import { Sparkles, Fish, Users, Leaf, Target, Scale, Heart } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useContent } from "@/contexts/ContentContext";

const About = () => {
  const { content, isLoading } = useContent();

  // Default fallback data
  const aboutData = content?.about || {
    subtitle: "A Tanzanian-led, tech-enabled fish company...",
    mission: "To empower Tanzanian communities...",
    vision: "To be East Africa's most trusted...",
    objectives: {
      quality: "To produce and supply...",
      postHarvest: "To reduce post-harvest loss...",
      protein: "To combat protein deficiency...",
      empower: "To empower fishing communities...",
      waste: "To create value from waste...",
      leadership: "To scale a trusted regional brand..."
    },
    story: "Nane Nane was founded..."
  };

  const objectives = [
    {
      title: "Quality Fish Products",
      description: aboutData.objectives.quality,
      icon: <Fish className="h-6 w-6 text-nanenane-600" />
    },
    {
      title: "Reduce Post-Harvest Loss",
      description: aboutData.objectives.postHarvest,
      icon: <Scale className="h-6 w-6 text-nanenane-600" />
    },
    {
      title: "Combat Protein Deficiency",
      description: aboutData.objectives.protein,
      icon: <Heart className="h-6 w-6 text-nanenane-600" />
    },
    {
      title: "Empower Communities",
      description: aboutData.objectives.empower,
      icon: <Users className="h-6 w-6 text-nanenane-600" />
    },
    {
      title: "Value from Waste",
      description: aboutData.objectives.waste,
      icon: <Sparkles className="h-6 w-6 text-nanenane-600" />
    },
    {
      title: "Regional Leadership",
      description: aboutData.objectives.leadership,
      icon: <Target className="h-6 w-6 text-nanenane-600" />
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section text-nanenane-100 */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-nanenane-900 to-white text-white">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Nane Nane</h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              {aboutData.subtitle}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  {aboutData.mission}
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Our Vision</h2>
                <p className="text-gray-700 mb-4">
                  {aboutData.vision}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-16 bg-nanenane-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Our Objectives</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {objectives.map((objective, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-nanenane-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    {objective.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-nanenane-800">{objective.title}</h3>
                  <p className="text-gray-600">
                    {objective.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Our Story</h2>
                {aboutData.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={aboutData.images?.[0]?.url || "https://i.ibb.co/99C7q1CN/IMG-20250505-WA0023.jpg"} 
                  alt={aboutData.images?.[0]?.alt || "Fish farming"} 
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />
                <img 
                  src={aboutData.images?.[1]?.url || "https://i.ibb.co/1YwqyPwB/IMG-20250505-WA0019.jpg"} 
                  alt={aboutData.images?.[1]?.alt || "Processing facility"} 
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />
                <img 
                  src={aboutData.images?.[2]?.url || "https://i.ibb.co/KjdNBCzL/IMG-20250505-WA0030.jpg"} 
                  alt={aboutData.images?.[2]?.alt || "Community impact"} 
                  className="w-full h-56 object-cover rounded-lg shadow-md col-span-2"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;




    // <img 
    //               src="https://i.ibb.co/99C7q1CN/IMG-20250505-WA0023.jpg" 
    //               alt="Fish farming" 
    //               className="w-full h-56 object-cover rounded-lg shadow-md"
    //             />
    //             <img 
    //               src="https://i.ibb.co/1YwqyPwB/IMG-20250505-WA0019.jpg" 
    //               alt="Processing facility" 
    //               className="w-full h-56 object-cover rounded-lg shadow-md"
    //             />
    //             <img 
    //               src="https://i.ibb.co/KjdNBCzL/IMG-20250505-WA0030.jpg" 
    //               alt="Community impact" 
    //               className="w-full h-56 object-cover rounded-lg shadow-md col-span-2"
    //             />