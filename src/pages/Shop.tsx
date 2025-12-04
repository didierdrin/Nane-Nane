
import { useState, useEffect } from "react";
import { Filter, Fish, LeafyGreen, DollarSign } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProducts } from "@/contexts/ProductContext";
import { Spinner } from "@/components/ui/spinner";
import { useContent } from "@/contexts/ContentContext"; 

// Product categories with icons
const categories = [
  { id: "all", name: "All Products", icon: Filter },
  { id: "fish", name: "Tilapia Fish", icon: Fish },
  { id: "inputs", name: "Nile Perch", icon: Fish },
  // { id: "investment", name: "Investment Opportunities", icon: DollarSign },
];

const Shop = () => {
  const { products, isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { content, isLoading: contentLoading } = useContent(); 

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Get the current category
  const currentCategory = categories.find(c => c.id === selectedCategory) || categories[0];
  const CategoryIcon = currentCategory.icon;


  // Default fallback data
  const shopData = content?.shop || {
    heroSubtitle: "From fresh fish to processed products and farming inputs, we provide everything you need in our integrated fish value chain.",
    howToOrder: [
      { number: "1", title: "Browse Our Products", subtitle: "Select the product category..." },
      { number: "2", title: "Click \"Order Now\"", subtitle: "You'll be connected..." },
      { number: "3", title: "Confirm Order & Payment", subtitle: "Our team will provide..." },
      { number: "4", title: "Delivery or Implementation", subtitle: "For products, choose..." }
    ],
    readyText: "Ready to get started?"
  };


  return (
    <>
      <Navbar />
      <main className=" pb-16">
        <div className="mb-4 bg-gradient-to-b from-nanenane-900 to-nanenane-700 text-white py-16 pt-0"></div>

        <section className="py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Mobile Filter Toggle */}
              <button
                className="md:hidden flex items-center gap-2 mb-4 bg-nanenane-100 py-2 px-4 rounded-md text-nanenane-800"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <Filter size={18} />
                Filter Products
              </button>

              {/* Sidebar Filters */}
              <div className={`md:w-1/4 lg:w-1/5 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                  <h2 className="text-lg font-semibold mb-4 text-nanenane-800">Categories</h2>
                  <ul className="space-y-2">
                    {categories.map(category => {
                      const Icon = category.icon;
                      return (
                        <li key={category.id}>
                          <button
                            className={`w-full text-left py-3 px-4 rounded-md transition-colors flex items-center gap-3 ${
                              selectedCategory === category.id
                                ? 'bg-nanenane-100 text-nanenane-800 font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <Icon size={18} className={selectedCategory === category.id ? 'text-nanenane-600' : 'text-gray-500'} />
                            {category.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <Separator className="my-6" />

                  <div className="mt-4 py-5 px-2 bg-nanenane-50 rounded-lg border border-nanenane-100">
                    <h3 className="font-medium text-nanenane-800 mb-2">Need Assistance?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact our team for custom orders or product inquiries.
                    </p>
                    <WhatsAppButton 
                      text="Contact Sales Team" 
                      phoneNumber="+255755823336" 
                      message="Hello, I have a question about your products."
                      className="w-full bg-green-600 hover:bg-green-700" 
                    />
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div className="md:w-3/4 lg:w-4/5">
                {/* Category Header */}
                <div className="mb-8 flex items-center">
                  <div className="mr-4 p-3 bg-nanenane-100 rounded-full">
                    <CategoryIcon size={24} className="text-nanenane-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-nanenane-800">{currentCategory.name}</h2>
                    <p className="text-gray-600">
                      {selectedCategory === "all" && "Browse all our aquaculture products and investment opportunities"}
                      {selectedCategory === "fish" && "Fresh fish products for vendors, traders, and fish farmers"}
                      {selectedCategory === "inputs" && "Quality inputs and equipment for your fish farming operations"}
                      {/* {selectedCategory === "investment" && "Investment opportunities in our sustainable aquaculture business"} */}
                    </p>
                  </div>
                </div>

                {/* Loading state */}
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block mb-4">
                      <Spinner size="lg" />
                    </div>
                    <p className="text-gray-600">Loading products...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No products found in this category.</p>
                  </div>
                ) : (
                  /* Product Grid */
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <Card 
                        key={product.id} 
                        className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full group border-nanenane-100"
                      >
                        <div className="h-52 overflow-hidden relative">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 right-3 py-1 px-3 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-nanenane-800 shadow-sm">
                            {product.price} TZS
                          </div>
                          {product.tag && (
                            <Badge className="absolute top-3 left-3 bg-nanenane-600 hover:bg-nanenane-700">
                              {product.tag}
                            </Badge>
                          )}
                        </div>
                        
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="flex-grow">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              product.category === 'fish' ? 'bg-blue-500' : 
                              product.category === 'inputs' ? 'bg-green-500' : 'bg-amber-500'
                            }`}></span>
                            {product.category === 'fish' ? 'Tilapia Fish' : 
                             product.category === 'inputs' ? 'Nile Perch' : 'Investment Opportunity'}
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-0">
                          <WhatsAppButton 
                            text="Inquire Now" 
                            phoneNumber="+255755823336" 
                            message={product.whatsapp_message}
                            className="w-full bg-green-600 hover:bg-green-700" 
                          />
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      


      {/* How To Order Section - UPDATED */}
      <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center text-gradient">How To Order</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-xl border border-nanenane-100">
                <ol className="space-y-8 relative before:absolute before:top-0 before:left-4 before:bottom-0 before:w-0.5 before:bg-nanenane-100">
                  {shopData.howToOrder.map((step, index) => (
                    <li key={index} className="flex ml-6">
                      <div className="bg-nanenane-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 -ml-10 z-10">
                        <span className="font-bold">{step.number}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-nanenane-800 text-lg mb-1">{step.title}</h3>
                        <p className="text-gray-600">{step.subtitle}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                
                <div className="mt-12 text-center p-6 bg-nanenane-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-nanenane-800 mb-3">{shopData.readyText}</h3>
                  <p className="text-gray-700 mb-4">
                    For bulk orders, special requests, or investment inquiries, contact our sales team directly.
                  </p>
                  <WhatsAppButton 
                    text="Contact Sales Team" 
                    phoneNumber="+255755823336" 
                    message="Hello, I would like to place a bulk order."
                    className="bg-green-600 hover:bg-green-700" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        

        {/* How To Order Section */}
        {/* <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center text-gradient">How To Order</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-xl border border-nanenane-100">
                <ol className="space-y-8 relative before:absolute before:top-0 before:left-4 before:bottom-0 before:w-0.5 before:bg-nanenane-100">
                  <li className="flex ml-6">
                    <div className="bg-nanenane-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 -ml-10 z-10">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-nanenane-800 text-lg mb-1">Browse Our Products</h3>
                      <p className="text-gray-600">Select the product category that interests you: fresh fish, Aquaculture Inputs, or investment opportunities.</p>
                    </div>
                  </li>
                  
                  <li className="flex ml-6">
                    <div className="bg-nanenane-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 -ml-10 z-10">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-nanenane-800 text-lg mb-1">Click "Order Now"</h3>
                      <p className="text-gray-600">You'll be connected to our sales team via WhatsApp to discuss your specific requirements.</p>
                    </div>
                  </li>
                  
                  <li className="flex ml-6">
                    <div className="bg-nanenane-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 -ml-10 z-10">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-nanenane-800 text-lg mb-1">Confirm Order & Payment</h3>
                      <p className="text-gray-600">Our team will provide payment options and confirm all details of your order.</p>
                    </div>
                  </li>
                  
                  <li className="flex ml-6">
                    <div className="bg-nanenane-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 -ml-10 z-10">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-nanenane-800 text-lg mb-1">Delivery or Implementation</h3>
                      <p className="text-gray-600">For products, choose between delivery options or pickup. For investments, we'll arrange the setup of your cage and management plan.</p>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-12 text-center p-6 bg-nanenane-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-nanenane-800 mb-3">Ready to get started?</h3>
                  <p className="text-gray-700 mb-4">
                    For bulk orders, special requests, or investment inquiries, contact our sales team directly.
                  </p>
                  <WhatsAppButton 
                    text="Contact Sales Team" 
                    phoneNumber="+255755823336" 
                    message="Hello, I would like to place a bulk order."
                    className="bg-green-600 hover:bg-green-700" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      {/* <section className="bg-gradient-to-r from-nanenane-900 to-nanenane-900 text-white py-16 pt-24">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Shop Our Products</h1>
            <p className="max-w-2xl text-nanenane-100 text-lg animate-fade-in delay-100">
              From fresh fish to processed products and farming inputs, we provide everything you need in our integrated fish value chain.
            </p>
          </div>
        </section> */}

        {/* Hero Section - UPDATED */}
      <section className="relative bg-cover bg-center text-white py-16 pt-24" style={{ backgroundImage: `url('/tanzania.png')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Shop Our Products</h1>
          <p className="max-w-2xl text-nanenane-100 text-lg animate-fade-in delay-100">
            {shopData.heroSubtitle}
          </p>
        </div>
      </section>

{/* <section className="relative bg-cover bg-center text-white py-16 pt-24" style={{ backgroundImage: `url('/tanzania.png')` }}>
  <div className="absolute inset-0 bg-black bg-opacity-40"></div> 
  <div className="container-custom relative z-10">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Shop Our Products</h1>
    <p className="max-w-2xl text-nanenane-100 text-lg animate-fade-in delay-100">
      From fresh fish to processed products and farming inputs, we provide everything you need in our integrated fish value chain.
    </p>
  </div>
</section> */}


      <Footer />
    </>
  );
};

export default Shop;
