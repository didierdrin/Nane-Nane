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
                  src="https://i.ibb.co/99C7q1CN/IMG-20250505-WA0023.jpg" 
                  alt="Fish farming" 
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />
                <img 
                  src="https://i.ibb.co/1YwqyPwB/IMG-20250505-WA0019.jpg" 
                  alt="Processing facility" 
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />
                <img 
                  src="https://i.ibb.co/KjdNBCzL/IMG-20250505-WA0030.jpg" 
                  alt="Community impact" 
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

// import { Sparkles, Fish, Users, Leaf, Target, Scale, Heart } from "lucide-react";
// import Footer from "@/components/layout/Footer";
// import Navbar from "@/components/layout/Navbar";

// const About = () => {
//   const objectives = [
//     {
//       title: "Quality Fish Products",
//       description: "To produce and supply high-quality, affordable fish products through sustainable cage farming and cold-chain aggregation.",
//       icon: <Fish className="h-6 w-6 text-nanenane-600" />
//     },
//     {
//       title: "Reduce Post-Harvest Loss",
//       description: "To reduce post-harvest loss by building a reliable, tech-enabled processing and distribution network for fishers and farmers.",
//       icon: <Scale className="h-6 w-6 text-nanenane-600" />
//     },
//     {
//       title: "Combat Protein Deficiency",
//       description: "To combat protein deficiency by improving year-round access to nutritious fish for urban and peri-urban consumers.",
//       icon: <Heart className="h-6 w-6 text-nanenane-600" />
//     },
//     {
//       title: "Empower Communities",
//       description: "To empower fishing communities by increasing incomes, providing market access, and offering training and support services.",
//       icon: <Users className="h-6 w-6 text-nanenane-600" />
//     },
//     {
//       title: "Value from Waste",
//       description: "To create value from waste by transforming fish by-products into food, fertilizer, and exportable components like bondo.",
//       icon: <Sparkles className="h-6 w-6 text-nanenane-600" />
//     },
//     {
//       title: "Regional Leadership",
//       description: "To scale a trusted regional brand that combines aquaculture, innovation, and social impact—becoming East Africa's leading integrated fish platform by 2035.",
//       icon: <Target className="h-6 w-6 text-nanenane-600" />
//     }
//   ];

//   return (
//     <>
//       <Navbar />
//       <main>
//         {/* Hero Section */}
//         <section className="pt-28 pb-16 bg-gradient-to-b from-nanenane-900 to-white text-white">
//           <div className="container-custom">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">About Nane Nane</h1>
//             <p className="text-xl text-nanenane-100 max-w-2xl">
//               A Tanzanian-led, tech-enabled fish company solving protein deficiency and post-harvest loss across East Africa.
//             </p>
//           </div>
//         </section>

//         {/* Mission & Vision */}
//         <section className="py-16 bg-white">
//           <div className="container-custom">
//             <div className="grid md:grid-cols-2 gap-16">
//               <div>
//                 <h2 className="text-3xl font-bold mb-6 text-gradient">Our Mission</h2>
//                 <p className="text-gray-700 mb-4">
//                 To empower Tanzanian communities and delight customers by combining ethical cage farming, efficient aggregation, and state-of-the-art processing to provide fresh, high-quality, and affordable fish products across retail, hospitality, and direct-to-consumer channels.

//                 </p>
//               </div>
              
//               <div>
//                 <h2 className="text-3xl font-bold mb-6 text-gradient">Our Vision</h2>
//                 <p className="text-gray-700 mb-4">
//                 To be East Africa’s most trusted and sustainable integrated fish‑supply platform by 2035, delivering quality protein to millions of individuals.

//                 </p>
                
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Objectives */}
//         <section className="py-16 bg-nanenane-50">
//           <div className="container-custom">
//             <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Our Objectives</h2>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {objectives.map((objective, index) => (
//                 <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//                   <div className="bg-nanenane-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
//                     {objective.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-3 text-nanenane-800">{objective.title}</h3>
//                   <p className="text-gray-600">
//                     {objective.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Our Story */}
//         <section className="py-16 bg-white">
//           <div className="container-custom">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h2 className="text-3xl font-bold mb-6 text-gradient">Our Story</h2>
//                 <p className="text-gray-700 mb-4">
//                 Nane Nane was founded in January 2024 in Lake Victoria, Tanzania, with 3 tilapia cages that produced 11.2 tonnes of tilapia, becoming profitable on its first year of operations.
//                 </p>
//                 <p className="text-gray-700 mb-4">
//                 Building on strong market insights, government relationships and team expertise, Nane Nane is now a vertically integrated fish‑supply business—aggregating catches from artisanal fishermen, processing fillets and by‑products, and operating branded retail outlets.
//                 </p>
//                 <p className="text-gray-700">
//                 We saw a gap in the fish distribution, and we decided to capitalize on this opportunity while maintaining our fish cage farming. Our seamless end‑to‑end cold chain, digital technologies, and high‑margin by‑product lines (e.g., fish maw) differentiate us in the market.
//                 </p>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <img 
//                   src="https://i.ibb.co/99C7q1CN/IMG-20250505-WA0023.jpg" 
//                   alt="Fish farming" 
//                   className="w-full h-56 object-cover rounded-lg shadow-md"
//                 />
//                 <img 
//                   src="https://i.ibb.co/1YwqyPwB/IMG-20250505-WA0019.jpg" 
//                   alt="Processing facility" 
//                   className="w-full h-56 object-cover rounded-lg shadow-md"
//                 />
//                 <img 
//                   src="https://i.ibb.co/KjdNBCzL/IMG-20250505-WA0030.jpg" 
//                   alt="Community impact" 
//                   className="w-full h-56 object-cover rounded-lg shadow-md col-span-2"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default About;
