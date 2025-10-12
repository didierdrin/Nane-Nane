
import { ArrowRight, BarChart2, TrendingUp, Users, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Invest = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-nanenane-900 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner With Nane Nane</h1>
              <p className="text-xl text-nanenane-100 mb-8">
                Join us in our mission to revolutionize aquaculture in East Africa through sustainable practices, cutting-edge technology, and community empowerment.
              </p>
              <Link 
                to="#investment-opportunities" 
                className="btn-accent bg-sand-500 hover:bg-sand-600 inline-flex items-center"
              >
                Explore Investment Opportunities
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Invest Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Why Invest in Nane Nane?</h2>
              <p className="text-gray-700">
                We offer a unique integrated business model that combines sustainable aquaculture, agricultural inputs, and eco-tourism. Our approach provides multiple revenue streams while creating positive environmental and social impact.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center card-hover">
                <div className="bg-nanenane-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-nanenane-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-nanenane-800">Market Growth</h3>
                <p className="text-gray-600">
                  The East African aquaculture market is projected to grow at 15% annually through 2030, creating significant investment opportunities.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center card-hover">
                <div className="bg-nanenane-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <BarChart2 className="h-8 w-8 text-nanenane-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-nanenane-800">Proven Model</h3>
                <p className="text-gray-600">
                  Our integrated business model has demonstrated success with consistent growth in production, sales, and tourism visits.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center card-hover">
                <div className="bg-nanenane-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-nanenane-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-nanenane-800">Social Impact</h3>
                <p className="text-gray-600">
                  Investment in Nane Nane supports local communities through job creation, farmer training, and economic development.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center card-hover">
                <div className="bg-nanenane-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Globe2 className="h-8 w-8 text-nanenane-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-nanenane-800">Sustainability</h3>
                <p className="text-gray-600">
                  Our environmentally responsible practices ensure long-term business sustainability while protecting Lake Victoria's ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Growth & Numbers Section */}
        <section className="py-16 bg-nanenane-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Our Growth Story</h2>
                <p className="text-gray-700 mb-6">
                  Since our founding in 2018, Nane Nane has demonstrated consistent growth across all aspects of our business. We've expanded from a small pilot project to a thriving operation with over 125 fish cages and a growing eco-tourism component.
                </p>
                <p className="text-gray-700 mb-6">
                  Our production capacity has increased by 35% year-over-year, while our customer base has grown to include both retail consumers and commercial buyers. The tourism aspect of our business has seen 50% annual growth in visitor numbers.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-3xl font-bold text-nanenane-600">35%</p>
                    <p className="text-gray-700">Annual Production Growth</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-3xl font-bold text-nanenane-600">50%</p>
                    <p className="text-gray-700">Tourism Growth</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-3xl font-bold text-nanenane-600">42%</p>
                    <p className="text-gray-700">Revenue Increase (2022-23)</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-3xl font-bold text-nanenane-600">300+</p>
                    <p className="text-gray-700">Local Farmers Supported</p>
                  </div>
                </div>
              </div>
              
              <div>
                <img 
                  src="/public/lovable-uploads/c7399aee-b0e8-4134-b62a-768f9d2499b8.png" 
                  alt="Aerial view of fish farm" 
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Investment Opportunities Section */}
        <section id="investment-opportunities" className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Investment Opportunities</h2>
            
            <Tabs defaultValue="equity">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="equity">Equity Investment</TabsTrigger>
                <TabsTrigger value="partnership">Strategic Partnership</TabsTrigger>
                <TabsTrigger value="expansion">Expansion Projects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="equity" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-nanenane-800">Equity Investment</h3>
                <p className="text-gray-700 mb-6">
                  We're seeking equity investors to join our growth journey as we scale our operations across Lake Victoria. Investment funds will be used to increase production capacity, enhance processing facilities, and expand our eco-tourism offerings.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-nanenane-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-nanenane-800 mb-2">Investment Range</h4>
                    <p className="text-gray-700">$50,000 - $500,000 USD</p>
                  </div>
                  <div className="bg-nanenane-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-nanenane-800 mb-2">Expected Returns</h4>
                    <p className="text-gray-700">18-25% ROI over 5 years</p>
                  </div>
                  <div className="bg-nanenane-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-nanenane-800 mb-2">Minimum Investment</h4>
                    <p className="text-gray-700">$50,000 USD</p>
                  </div>
                  <div className="bg-nanenane-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-nanenane-800 mb-2">Investment Term</h4>
                    <p className="text-gray-700">3-5 years</p>
                  </div>
                </div>
                
                <Link 
                  to="/contact" 
                  className="btn-primary bg-nanenane-600 hover:bg-nanenane-700 inline-flex items-center"
                >
                  Request Investor Prospectus
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </TabsContent>
              
              <TabsContent value="partnership" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-nanenane-800">Strategic Partnership</h3>
                <p className="text-gray-700 mb-6">
                  We welcome strategic partners who can bring complementary expertise, technology, or market access to our operation. Potential partnership areas include processing technology, feed production, distribution networks, and tourism operations.
                </p>
                
                <h4 className="font-semibold text-nanenane-800 mb-3">Partnership Opportunities:</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                    <span className="text-gray-700">Technology partnerships for monitoring and automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                    <span className="text-gray-700">Feed production and supply chain integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                    <span className="text-gray-700">Distribution and market access partnerships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                    <span className="text-gray-700">Tourism and hospitality collaboration</span>
                  </li>
                </ul>
                
                <Link 
                  to="/contact" 
                  className="btn-primary bg-nanenane-600 hover:bg-nanenane-700 inline-flex items-center"
                >
                  Discuss Partnership Opportunities
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </TabsContent>
              
              <TabsContent value="expansion" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-nanenane-800">Expansion Projects</h3>
                <p className="text-gray-700 mb-6">
                  We have several focused expansion projects seeking specific funding. These initiatives have defined timelines, budgets, and expected returns.
                </p>
                
                <div className="space-y-6 mb-6">
                  <div className="border border-nanenane-200 p-5 rounded-lg">
                    <h4 className="font-semibold text-nanenane-800 mb-2">Processing Facility Expansion</h4>
                    <p className="text-gray-700 mb-3">
                      Funding for a new processing facility to increase capacity and add value-added products.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Investment Required:</p>
                        <p className="font-medium">$150,000 USD</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Timeline:</p>
                        <p className="font-medium">12 months</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-nanenane-200 p-5 rounded-lg">
                    <h4 className="font-semibold text-nanenane-800 mb-2">Eco-Tourism Accommodation</h4>
                    <p className="text-gray-700 mb-3">
                      Construction of additional lakeside cottages to increase overnight visitor capacity.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Investment Required:</p>
                        <p className="font-medium">$100,000 USD</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Timeline:</p>
                        <p className="font-medium">8 months</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-nanenane-200 p-5 rounded-lg">
                    <h4 className="font-semibold text-nanenane-800 mb-2">New Lake Region Expansion</h4>
                    <p className="text-gray-700 mb-3">
                      Establishing operations in a new region of Lake Victoria with 50 additional fish cages.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Investment Required:</p>
                        <p className="font-medium">$200,000 USD</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Timeline:</p>
                        <p className="font-medium">18 months</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/contact" 
                  className="btn-primary bg-nanenane-600 hover:bg-nanenane-700 inline-flex items-center"
                >
                  Request Project Details
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-nanenane-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Explore Investment Opportunities?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Contact our investment team today to discuss how you can be part of the Nane Nane growth story. 
              We'll provide you with our detailed investor prospectus and answer any questions you may have.
            </p>
            <Link 
              to="/contact" 
              className="btn-accent bg-sand-500 hover:bg-sand-600 inline-flex items-center"
            >
              Contact Our Investment Team
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Invest;
