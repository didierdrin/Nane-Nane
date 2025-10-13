import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const Contact = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-nanenane-900 to-white text-white">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="max-w-2xl text-nanenane-100">
              Have questions about our fish products, services, or partnership opportunities? Get in touch with the Nane Nane team - we're here to help!
            </p>
          </div>
        </section>

        {/* Contact Tabs Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="general">General Inquiries</TabsTrigger>
                  <TabsTrigger value="orders">Orders & Distribution</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="bg-white p-6 rounded-lg shadow-md">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-nanenane-800">General Inquiries</h3>
                      <p className="text-gray-700 mb-6">
                        For general questions about Nane Nane, our integrated fish value chain, or to learn more about our impact, please reach out using the contact information below.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Mail className="text-nanenane-600 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-gray-700">mohammedatul7@gmail.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="text-nanenane-600 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <p className="text-gray-700">+255 755 823 336</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="text-nanenane-600 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-gray-900">Address</p>
                            <p className="text-gray-700">Lake Victoria, Mwanza Region, Tanzania</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="p-5 bg-nanenane-50 rounded-lg mb-6">
                        <h4 className="font-semibold text-nanenane-800 mb-3">Quick Response via WhatsApp</h4>
                        <p className="text-gray-700 mb-4">
                          For the fastest response, connect with us directly on WhatsApp.
                        </p>
                        <WhatsAppButton 
                          text="Contact Us on WhatsApp" 
                          phoneNumber="+255755823336" 
                          message="Hello, I have a general inquiry about Nane Nane."
                          className="w-full bg-green-600 hover:bg-green-700" 
                        />
                      </div>
                      
                      <div className="p-5 border border-nanenane-200 rounded-lg">
                        <h4 className="font-semibold text-nanenane-800 mb-3">Business Hours</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex justify-between">
                            <span>Monday - Friday:</span>
                            <span>8:00 AM - 5:00 PM</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Saturday:</span>
                            <span>9:00 AM - 3:00 PM</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Sunday:</span>
                            <span>Closed</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders" className="bg-white p-6 rounded-lg shadow-md">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-nanenane-800">Orders & Distribution</h3>
                      <p className="text-gray-700 mb-6">
                        For inquiries related to our fish products, cold-chain services, or to place an order, our sales team is here to assist you.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Mail className="text-nanenane-600 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-gray-700">mohammedatul7@gmail.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="text-nanenane-600 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-gray-900">Sales Phone</p>
                            <p className="text-gray-700">+255 755 823 336</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="font-semibold text-nanenane-800 mb-3">Order Process</h4>
                        <p className="text-gray-700 mb-4">
                          Orders can be placed directly through our website or by contacting our sales team. We offer reliable cold-chain delivery to ensure your fish arrives fresh.
                        </p>
                        <p className="text-gray-700">
                          For bulk orders or special requirements, please contact us for personalized service and pricing.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="p-5 bg-green-50 rounded-lg mb-6">
                        <h4 className="font-semibold text-green-800 mb-3">Direct Order via WhatsApp</h4>
                        <p className="text-gray-700 mb-4">
                          Place your order directly through WhatsApp for quick and convenient service.
                        </p>
                        <WhatsAppButton 
                          text="Order via WhatsApp" 
                          phoneNumber="+255755823336" 
                          message="Hello, I would like to place an order."
                          className="w-full bg-green-600 hover:bg-green-700" 
                        />
                      </div>
                      
                      <div className="p-5 border border-nanenane-200 rounded-lg">
                        <h4 className="font-semibold text-nanenane-800 mb-3">Delivery Information</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                            <span>Delivery available within Mwanza Region</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                            <span>Free delivery for orders over 50,000 TZS</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-nanenane-100 text-nanenane-700 p-1 rounded-full mr-3">✓</span>
                            <span>Pickup option available at our farm location</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Location Map Section */}
        <section className="py-16 bg-nanenane-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center text-gradient">Our Location</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-nanenane-800">Nane Nane Farm & Eco-Resort</h3>
                  <p className="text-gray-700 mb-6">
                    Located on the shores of Lake Victoria in Mwanza Region, Tanzania. Our farm is accessible by road and is approximately 2 hours from Serengeti National Park.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="text-nanenane-600 mt-1 mr-3 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-700">Lake Victoria, Mwanza Region, Tanzania</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageSquare className="text-nanenane-600 mt-1 mr-3 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">Directions</p>
                        <p className="text-gray-700">Contact us for detailed directions based on your starting point.</p>
                      </div>
                    </div>
                  </div>
                  
                  <WhatsAppButton 
                    text="Get Directions on WhatsApp" 
                    phoneNumber="+255755823336" 
                    message="Hello, I need directions to reach Nane Nane farm."
                    className="bg-green-600 hover:bg-green-700" 
                  />
                </div>
                
                <div className="h-72 md:h-auto rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254924.0362096492!2d32.81573065!3d-2.5149998499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19ce84993e809cef%3A0x7137dd24a8323c74!2sMwanza%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1715357834087!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nane Nane Farm Location"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
