
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/contexts/ProductContext";
import { ShoppingCart, Package, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { products } = useProducts();

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
                  to="/shop" 
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
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
