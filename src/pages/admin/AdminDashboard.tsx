
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductContext";
import { ShoppingCart, Package, DollarSign, Timer, Users, Check, X, Edit, Trash2, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { products } = useProducts();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current user and set as admin
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const currentAdmin = {
            id: user.id,
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'Admin',
            email: user.email || 'No email',
            role: user.email === 'nsedidier@gmail.com' ? 'super_admin' : 'admin',
            status: 'active',
            phone: user.user_metadata?.phone || '+255755823336'
          };
          
          setAdmins([currentAdmin]);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const confirmAdmin = (id: number) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === id ? { ...admin, status: "active" } : admin
    ));
  };

  const deleteAdmin = (id: number) => {
    setAdmins(prev => prev.filter(admin => admin.id !== id));
  };

  const promoteToSuperAdmin = (id: number) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === id ? { ...admin, role: "super_admin" } : admin
    ));
  };

  // Get counts of different categories
  const fishProducts = products.filter(p => p.category === "fish").length;
  const nileProducts = products.filter(p => p.category === "Nile Perch").length;
  // const investmentProducts = products.filter(p => p.category === "investment").length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome to the NANENANE admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <ShoppingCart className="h-4 w-4 text-nanenane-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-gray-500">Products in database</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fresh Fish Products</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fishProducts}</div>
              <p className="text-xs text-gray-500">Fish and fingerlings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment Products</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nileProducts}</div>
              <p className="text-xs text-gray-500">Feeds and farm equipment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/admin/products" 
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Manage Products
                </Link>
                <Link 
                  to="/admin/products/new" 
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Add New Product
                </Link>
                <Link 
                  to="/admin/content" 
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <Timer className="mr-2 h-4 w-4" />
                  Content Updates
                </Link>
                <Link 
                  to="/" 
                  className="text-blue-600 hover:underline flex items-center"
                  target="_blank"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Shop Page
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Admin Username:</span>
                  <span>admin</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-500">Storage:</span>
                  <span>Database (Supabase)</span>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Admin Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Loading users...</p>
              </div>
            ) : (
            <div className="space-y-4">
              {admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{admin.username}</span>
                      {admin.role === "super_admin" && <Crown className="h-4 w-4 text-yellow-500" />}
                      <span className={`px-2 py-1 text-xs rounded ${
                        admin.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {admin.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {admin.status === "pending" && (
                      <Button size="sm" onClick={() => confirmAdmin(admin.id)} className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {admin.role !== "super_admin" && (
                      <Button size="sm" variant="outline" onClick={() => promoteToSuperAdmin(admin.id)}>
                        <Crown className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => deleteAdmin(admin.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
