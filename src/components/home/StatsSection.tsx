import { TrendingUp, Users, Package, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "@/contexts/ContentContext";

const CountUp = ({ endValue, duration = 2000, suffix = "" }: { endValue: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const nextCount = Math.min((progress / duration) * endValue, endValue);
      setCount(nextCount);
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);
  
  return <>{Number(count.toFixed(1)).toLocaleString()}{suffix}</>;
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { content } = useContent();
  
  const impactData = content?.explore?.impact || {
    subtitle: "Through our integrated fish value chain, we're creating sustainable impact in Tanzania by increasing incomes, creating jobs, and reducing food waste.",
    incomeIncrease: "15",
    jobsCreated: "15",
    protein: "11.2",
    fishWaste: "< 1"
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
    
    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <TrendingUp size={32} className="text-nanenane-600" />,
      value: parseFloat(impactData.incomeIncrease),
      suffix: "%",
      label: "Income Increase",
      description: "For fishermen and fish farmers"
    },
    {
      icon: <Users size={32} className="text-nanenane-600" />,
      value: parseFloat(impactData.jobsCreated),
      label: "Jobs Created",
      description: "Full and part-time employment opportunities"
    },
    {
      icon: <Package size={32} className="text-nanenane-600" />,
      value: parseFloat(impactData.protein),
      label: "Tonnes of Protein",
      description: "Supplied to consumers"
    },
    {
      icon: <Leaf size={32} className="text-nanenane-600" />,
      value: 1,
      suffix: "%",
      prefix: "< ",
      label: "Fish Waste",
      description: "Reduced through ready market access"
    }
  ];

  return (
    <section id="stats-section" className="py-16 bg-nanenane-50">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-gradient relative inline-block">
            Our Impact in Numbers
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-nanenane-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            {impactData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`bg-white p-6 rounded-lg shadow-md text-center card-hover animate-fade-in delay-${index * 100}`}
            >
              <div className="flex justify-center mb-4 animate-float">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-nanenane-800 mb-2">
                {isVisible ? (
                  <>{stat.prefix}<CountUp endValue={stat.value} suffix={stat.suffix} /></>
                ) : "0"}
              </h3>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {stat.label}
              </p>
              <p className="text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

// import { TrendingUp, Users, Package, Leaf } from "lucide-react";
// import { useEffect, useState } from "react";

// const CountUp = ({ endValue, duration = 2000, suffix = "" }: { endValue: number; duration?: number; suffix?: string }) => {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     let startTime: number;
//     let animationFrame: number;
    
//     const updateCount = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
      
//       const nextCount = Math.min((progress / duration) * endValue, endValue);
//       setCount(nextCount);
      
//       if (progress < duration) {
//         animationFrame = requestAnimationFrame(updateCount);
//       }
//     };
    
//     animationFrame = requestAnimationFrame(updateCount);
    
//     return () => cancelAnimationFrame(animationFrame);
//   }, [endValue, duration]);
  
//   return <>{Number(count.toFixed(1)).toLocaleString()}{suffix}</>;
// };

// const StatsSection = () => {
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
    
//     const element = document.getElementById('stats-section');
//     if (element) observer.observe(element);
    
//     return () => observer.disconnect();
//   }, []);

//   const stats = [
//     {
//       icon: <TrendingUp size={32} className="text-nanenane-600" />,
//       value: 15,
//       suffix: "%",
//       label: "Income Increase",
//       description: "For fishermen and fish farmers"
//     },
//     {
//       icon: <Users size={32} className="text-nanenane-600" />,
//       value: 15,
//       label: "Jobs Created",
//       description: "Full and part-time employment opportunities"
//     },
//     {
//       icon: <Package size={32} className="text-nanenane-600" />,
//       value: 11.2,
//       label: "Tonnes of Protein",
//       description: "Supplied to consumers"
//     },
//     {
//       icon: <Leaf size={32} className="text-nanenane-600" />,
//       value: 1,
//       suffix: "%",
//       prefix: "< ",
//       label: "Fish Waste",
//       description: "Reduced through ready market access"
//     }
//   ];

//   return (
//     <section id="stats-section" className="py-16 bg-nanenane-50">
//       <div className="container-custom">
//         <div className="text-center mb-12 animate-fade-in">
//           <h2 className="text-3xl font-bold mb-4 text-gradient relative inline-block">
//             Our Impact in Numbers
//             <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-nanenane-500 rounded-full"></span>
//           </h2>
//           <p className="text-gray-600 max-w-3xl mx-auto mt-6">
//             Through our integrated fish value chain, we're creating sustainable impact in Tanzania by increasing incomes, creating jobs, and reducing food waste.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <div 
//               key={index}
//               className={`bg-white p-6 rounded-lg shadow-md text-center card-hover animate-fade-in delay-${index * 100}`}
//             >
//               <div className="flex justify-center mb-4 animate-float">
//                 {stat.icon}
//               </div>
//               <h3 className="text-3xl font-bold text-nanenane-800 mb-2">
//                 {isVisible ? (
//                   <>{stat.prefix}<CountUp endValue={stat.value} suffix={stat.suffix} /></>
//                 ) : "0"}
//               </h3>
//               <p className="text-lg font-semibold text-gray-800 mb-2">
//                 {stat.label}
//               </p>
//               <p className="text-gray-600">
//                 {stat.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;
