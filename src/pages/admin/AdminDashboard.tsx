
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProducts } from "@/contexts/ProductContext";
import { ShoppingCart, Package, DollarSign, Timer, Users, Check, X, Edit, Trash2, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { products } = useProducts();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editPhone, setEditPhone] = useState("");
  const [isActivePhone, setIsActivePhone] = useState(false);
  const { toast } = useToast();

  // Fetch all users from admin_users table
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data: adminUsers, error } = await supabase
          .from('admin_users')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Database error:', error);
          setAdmins([]);
        } else {
          setAdmins(adminUsers || []);
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
        setAdmins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const confirmAdmin = async (id) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ status: 'active' })
        .eq('id', id);
      
      if (error) throw error;
      
      setAdmins(prev => prev.map(admin => 
        admin.id === id ? { ...admin, status: "active" } : admin
      ));
      toast({ title: "Success", description: "Admin confirmed successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to confirm admin", variant: "destructive" });
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setAdmins(prev => prev.filter(admin => admin.id !== id));
      toast({ title: "Success", description: "Admin deleted successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete admin", variant: "destructive" });
    }
  };

  const promoteToSuperAdmin = async (id) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ role: 'super_admin' })
        .eq('id', id);
      
      if (error) throw error;
      
      setAdmins(prev => prev.map(admin => 
        admin.id === id ? { ...admin, role: "super_admin" } : admin
      ));
      toast({ title: "Success", description: "Admin promoted to super admin" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to promote admin", variant: "destructive" });
    }
  };

  const openEditDialog = (admin) => {
    setEditingAdmin(admin);
    setEditPhone(admin.phone || "");
    setIsActivePhone(admin.is_active_phone || false);
  };

  const saveAdminEdit = async () => {
    try {
      // If setting as active phone, deactivate others first
      if (isActivePhone) {
        await supabase
          .from('admin_users')
          .update({ is_active_phone: false })
          .neq('id', editingAdmin.id);
      }
      
      // Update the current admin
      const { error } = await supabase
        .from('admin_users')
        .update({ 
          phone: editPhone,
          is_active_phone: isActivePhone 
        })
        .eq('id', editingAdmin.id);
      
      if (error) throw error;
      
      setAdmins(prev => prev.map(admin => {
        if (admin.id === editingAdmin.id) {
          return {
            ...admin,
            phone: editPhone,
            is_active_phone: isActivePhone
          };
        }
        if (isActivePhone && admin.is_active_phone) {
          return { ...admin, is_active_phone: false };
        }
        return admin;
      }));
      
      setEditingAdmin(null);
      toast({ title: "Success", description: "Admin details updated successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update admin", variant: "destructive" });
    }
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
              {/* <DollarSign className="h-4 w-4 text-green-600" /> */}
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(admin)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Admin Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              placeholder="+255700000000"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="active-phone"
                              checked={isActivePhone}
                              onCheckedChange={setIsActivePhone}
                            />
                            <Label htmlFor="active-phone">Set as active phone for inquiries</Label>
                          </div>
                          <Button onClick={saveAdminEdit} className="w-full">
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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
