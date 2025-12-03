import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Save, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AdminLayout from '@/components/admin/AdminLayout';

// Default content structure
const defaultContent = {
  shop: {
    howToOrder: [
      {
        number: "1",
        title: "Browse Our Products",
        subtitle: "Select the product category that interests you: fresh fish, Aquaculture Inputs, or investment opportunities."
      },
      {
        number: "2",
        title: "Click \"Order Now\"",
        subtitle: "You'll be connected to our sales team via WhatsApp to discuss your specific requirements."
      },
      {
        number: "3",
        title: "Confirm Order & Payment",
        subtitle: "Our team will provide payment options and confirm all details of your order."
      },
      {
        number: "4",
        title: "Delivery or Implementation",
        subtitle: "For products, choose between delivery options or pickup. For investments, we'll arrange the setup of your cage and management plan."
      }
    ],
    readyText: "Ready to get started?",
    heroSubtitle: "From fresh fish to processed products and farming inputs, we provide everything you need in our integrated fish value chain."
  },
  about: {
    subtitle: "A Tanzanian-led, tech-enabled fish company solving protein deficiency and post-harvest loss across East Africa.",
    mission: "To empower Tanzanian communities and delight customers by combining ethical cage farming, efficient aggregation, and state-of-the-art processing to provide fresh, high-quality, and affordable fish products across retail, hospitality, and direct-to-consumer channels.",
    vision: "To be East Africa's most trusted and sustainable integrated fish‑supply platform by 2035, delivering quality protein to millions of individuals.",
    objectives: {
      quality: "To produce and supply high-quality, affordable fish products through sustainable cage farming and cold-chain aggregation.",
      postHarvest: "To reduce post-harvest loss by building a reliable, tech-enabled processing and distribution network for fishers and farmers.",
      protein: "To combat protein deficiency by improving year-round access to nutritious fish for urban and peri-urban consumers.",
      empower: "To empower fishing communities by increasing incomes, providing market access, and offering training and support services.",
      waste: "To create value from waste by transforming fish by-products into food, fertilizer, and exportable components like bondo.",
      leadership: "To scale a trusted regional brand that combines aquaculture, innovation, and social impact—becoming East Africa's leading integrated fish platform by 2035."
    },
    story: "Nane Nane was founded in January 2024 in Lake Victoria, Tanzania, with 3 tilapia cages that produced 11.2 tonnes of tilapia, becoming profitable on its first year of operations.\n\nBuilding on strong market insights, government relationships and team expertise, Nane Nane is now a vertically integrated fish‑supply business—aggregating catches from artisanal fishermen, processing fillets and by‑products, and operating branded retail outlets.\n\nWe saw a gap in the fish distribution, and we decided to capitalize on this opportunity while maintaining our fish cage farming. Our seamless end‑to‑end cold chain, digital technologies, and high‑margin by‑product lines (e.g., fish maw) differentiate us in the market."
  },
  contact: {
    subtitle: "Have questions about our fish products, services, or partnership opportunities? Get in touch with the Nane Nane team - we're here to help!",
    general: {
      subtitle: "For general questions about Nane Nane, our integrated fish value chain, or to learn more about our impact, please reach out using the contact information below.",
      email: "mohammedatul7@gmail.com",
      phone: "+255 755 823 336",
      address: "Lake Victoria, Mwanza Region, Tanzania"
    },
    orders: {
      subtitle: "For inquiries related to our fish products, cold-chain services, or to place an order, our sales team is here to assist you.",
      email: "mohammedatul7@gmail.com",
      salesPhone: "+255 755 823 336",
      orderProcess: "Orders can be placed directly through our website or by contacting our sales team. We offer reliable cold-chain delivery to ensure your fish arrives fresh.",
      deliveryInfo: "For bulk orders or special requirements, please contact us for personalized service and pricing."
    },
    location: {
      subtitle: "Located on the shores of Lake Victoria in Mwanza Region, Tanzania. Our farm is accessible by road and is approximately 2 hours from Serengeti National Park.",
      address: "Lake Victoria, Mwanza Region, Tanzania",
      directions: "Contact us for detailed directions based on your starting point."
    }
  },
  explore: {
    hero: {
      title: "Fresh from Lake Victoria\nMade for Your Plate"
    },
    about: {
      subtitle: "Nane Nane is a Tanzanian-led, tech-enabled fish company solving protein deficiency and post-harvest loss across East Africa. We operate an integrated fish value chain—from cage-based fish farming and cold-chain aggregation, to value-added processing and smart distribution. Through our sustainable practices, we empower fishing communities, increase incomes, and deliver fresh, affordable, high-quality fish to urban households, retailers, and hospitality businesses.\n\nOur model blends ethical aquaculture & sustainable aggregation from fishers, clean technology, and circular economy innovation—turning waste into value and fish into hope. Fresh from the Lake. Made for Your Plate. Empowering communities, one fish at a time."
    },
    impact: {
      subtitle: "Through our integrated fish value chain, we're creating sustainable impact in Tanzania by increasing incomes, creating jobs, and reducing food waste.",
      incomeIncrease: "15",
      jobsCreated: "15",
      protein: "11.2",
      fishWaste: "< 1"
    },
    products: {
      subtitle: "Through our integrated fish value chain, we deliver fresh, affordable, high-quality fish while empowering local fishing communities and reducing post-harvest loss.",
      tilapia: {
        title: "Fresh Tilapia Fish",
        subtitle: "Sustainably farm-raised tilapia from our cage-based farming operations in Lake Victoria.",
        features: [
          "Sustainably farm-raised in Lake Victoria",
          "High in protein and essential nutrients",
          "Provides income to local communities",
          "Available in various sizes with delivery options"
        ],
        buttonText: "Order Fresh Tilapia Fish"
      },
      nilePerch: {
        title: "Fresh Nile Perch",
        subtitle: "Premium quality Nile Perch ethically sourced through our cold-chain aggregation network from local fishers.",
        features: [
          "Ethically sourced from local fishing communities",
          "Processed through our cold-chain to ensure freshness",
          "Rich in protein and omega-3 fatty acids",
          "Supports sustainable fishing practices"
        ],
        buttonText: "Order Fresh Nile Perch"
      }
    }
  }, 
  footer: {
    description: "A Tanzanian-led, tech-enabled fish company solving protein deficiency and post-harvest loss across East Africa.",
    address: "Kongolo, Mwanza, Tanzania",
    phone: "+255 755 823 336"
  }
};

const ContentManagement = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data?.content) {
        setContent(data.content);
      } else {
        // Initialize with default content
        await saveContent(defaultContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (contentToSave = content) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('site_content')
        .upsert({
          id: 1,
          content: contentToSave,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Content saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: 'Failed to save content' });
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = async () => {
    if (window.confirm('Are you sure you want to reset all content to default values?')) {
      setContent(defaultContent);
      await saveContent(defaultContent);
    }
  };

  const resetSectionToDefaults = async (section) => {
    if (window.confirm(`Are you sure you want to reset ${section} section to default values?`)) {
      const newContent = { ...content, [section]: defaultContent[section] };
      setContent(newContent);
      await saveContent(newContent);
    }
  };

  const updateField = (path, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const updateArrayField = (path, index, field, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      
      current[index][field] = value;
      return newContent;
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading content...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Content Management</h1>
            <p className="text-gray-500">Update website content across all pages</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={() => saveContent()} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </div>

        {message.text && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="footer" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>

         
          {/* Shop Content */}
          <TabsContent value="shop" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Shop Page Content</CardTitle>
                    <CardDescription>Update shop page hero and order process</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => resetSectionToDefaults('shop')}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="shop-hero">Hero Subtitle</Label>
                  <Textarea
                    id="shop-hero"
                    value={content.shop.heroSubtitle}
                    onChange={(e) => updateField('shop.heroSubtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">How To Order Steps</h3>
                  {content.shop.howToOrder.map((step, index) => (
                    <div key={index} className="space-y-2 mb-4 p-4 border rounded-lg">
                      <Label>Step {step.number} Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => updateArrayField('shop.howToOrder', index, 'title', e.target.value)}
                      />
                      <Label>Step {step.number} Description</Label>
                      <Textarea
                        value={step.subtitle}
                        onChange={(e) => updateArrayField('shop.howToOrder', index, 'subtitle', e.target.value)}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="shop-ready">Ready Text</Label>
                  <Input
                    id="shop-ready"
                    value={content.shop.readyText}
                    onChange={(e) => updateField('shop.readyText', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Content */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>About Page Content</CardTitle>
                    <CardDescription>Update about page information</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => resetSectionToDefaults('about')}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-subtitle">About Subtitle</Label>
                  <Textarea
                    id="about-subtitle"
                    value={content.about.subtitle}
                    onChange={(e) => updateField('about.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="about-mission">Mission</Label>
                  <Textarea
                    id="about-mission"
                    value={content.about.mission}
                    onChange={(e) => updateField('about.mission', e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="about-vision">Vision</Label>
                  <Textarea
                    id="about-vision"
                    value={content.about.vision}
                    onChange={(e) => updateField('about.vision', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-semibold">Objectives</h3>
                <div>
                  <Label>Quality Fish Products</Label>
                  <Textarea
                    value={content.about.objectives.quality}
                    onChange={(e) => updateField('about.objectives.quality', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Reduce Post-Harvest Loss</Label>
                  <Textarea
                    value={content.about.objectives.postHarvest}
                    onChange={(e) => updateField('about.objectives.postHarvest', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Combat Protein Deficiency</Label>
                  <Textarea
                    value={content.about.objectives.protein}
                    onChange={(e) => updateField('about.objectives.protein', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Empower Communities</Label>
                  <Textarea
                    value={content.about.objectives.empower}
                    onChange={(e) => updateField('about.objectives.empower', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Value from Waste</Label>
                  <Textarea
                    value={content.about.objectives.waste}
                    onChange={(e) => updateField('about.objectives.waste', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Regional Leadership</Label>
                  <Textarea
                    value={content.about.objectives.leadership}
                    onChange={(e) => updateField('about.objectives.leadership', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="about-story">Our Story</Label>
                  <Textarea
                    id="about-story"
                    value={content.about.story}
                    onChange={(e) => updateField('about.story', e.target.value)}
                    rows={8}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Content */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Contact Page Content</CardTitle>
                    <CardDescription>Update contact page information</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => resetSectionToDefaults('contact')}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact-subtitle">Page Subtitle</Label>
                  <Textarea
                    id="contact-subtitle"
                    value={content.contact.subtitle}
                    onChange={(e) => updateField('contact.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-semibold">General Inquiries</h3>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.contact.general.subtitle}
                    onChange={(e) => updateField('contact.general.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={content.contact.general.email}
                      onChange={(e) => updateField('contact.general.email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={content.contact.general.phone}
                      onChange={(e) => updateField('contact.general.phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={content.contact.general.address}
                      onChange={(e) => updateField('contact.general.address', e.target.value)}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-semibold">Orders & Distribution</h3>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.contact.orders.subtitle}
                    onChange={(e) => updateField('contact.orders.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={content.contact.orders.email}
                      onChange={(e) => updateField('contact.orders.email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Sales Phone</Label>
                    <Input
                      value={content.contact.orders.salesPhone}
                      onChange={(e) => updateField('contact.orders.salesPhone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Order Process</Label>
                  <Textarea
                    value={content.contact.orders.orderProcess}
                    onChange={(e) => updateField('contact.orders.orderProcess', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Delivery Information</Label>
                  <Textarea
                    value={content.contact.orders.deliveryInfo}
                    onChange={(e) => updateField('contact.orders.deliveryInfo', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-semibold">Location</h3>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.contact.location.subtitle}
                    onChange={(e) => updateField('contact.location.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={content.contact.location.address}
                      onChange={(e) => updateField('contact.location.address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Directions</Label>
                    <Input
                      value={content.contact.location.directions}
                      onChange={(e) => updateField('contact.location.directions', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Explore Content */}
          <TabsContent value="explore" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Explore Page Content</CardTitle>
                    <CardDescription>Update explore/home page content</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => resetSectionToDefaults('explore')}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="explore-hero-title">Hero Title</Label>
                  <Textarea
                    id="explore-hero-title"
                    value={content.explore.hero.title}
                    onChange={(e) => updateField('explore.hero.title', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="explore-about">About Us Subtitle</Label>
                  <Textarea
                    id="explore-about"
                    value={content.explore.about.subtitle}
                    onChange={(e) => updateField('explore.about.subtitle', e.target.value)}
                    rows={6}
                  />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-semibold">Impact Numbers</h3>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.explore.impact.subtitle}
                    onChange={(e) => updateField('explore.impact.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label>Income Increase</Label>
                    <Input
                      value={content.explore.impact.incomeIncrease}
                      onChange={(e) => updateField('explore.impact.incomeIncrease', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Jobs Created</Label>
                    <Input
                      value={content.explore.impact.jobsCreated}
                      onChange={(e) => updateField('explore.impact.jobsCreated', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Tonnes of Protein</Label>
                    <Input
                      value={content.explore.impact.protein}
                      onChange={(e) => updateField('explore.impact.protein', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Fish Waste</Label>
                    <Input
                      value={content.explore.impact.fishWaste}
                      onChange={(e) => updateField('explore.impact.fishWaste', e.target.value)}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-semibold">Products Section</h3>
                <div>
                  <Label>Section Subtitle</Label>
                  <Textarea
                    value={content.explore.products.subtitle}
                    onChange={(e) => updateField('explore.products.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <h4 className="font-semibold mt-4">Fresh Tilapia Fish</h4>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={content.explore.products.tilapia.title}
                    onChange={(e) => updateField('explore.products.tilapia.title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.explore.products.tilapia.subtitle}
                    onChange={(e) => updateField('explore.products.tilapia.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={content.explore.products.tilapia.buttonText}
                    onChange={(e) => updateField('explore.products.tilapia.buttonText', e.target.value)}
                  />
                </div>
                
                <h4 className="font-semibold mt-4">Fresh Nile Perch</h4>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={content.explore.products.nilePerch.title}
                    onChange={(e) => updateField('explore.products.nilePerch.title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.explore.products.nilePerch.subtitle}
                    onChange={(e) => updateField('explore.products.nilePerch.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={content.explore.products.nilePerch.buttonText}
                    onChange={(e) => updateField('explore.products.nilePerch.buttonText', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

           {/* Footer Content */}
           <TabsContent value="footer" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Footer Content</CardTitle>
                    <CardDescription>Update footer information displayed across all pages</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => resetSectionToDefaults('footer')}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="footer-description">Company Description</Label>
                  <Textarea
                    id="footer-description"
                    value={content.footer.description}
                    onChange={(e) => updateField('footer.description', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="footer-address">Address</Label>
                  <Input
                    id="footer-address"
                    value={content.footer.address}
                    onChange={(e) => updateField('footer.address', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="footer-phone">Phone Number</Label>
                  <Input
                    id="footer-phone"
                    value={content.footer.phone}
                    onChange={(e) => updateField('footer.phone', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;