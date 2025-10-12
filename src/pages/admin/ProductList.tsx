
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  Fish,
  LeafyGreen,
  DollarSign,
  RefreshCw,
  Trash,
  Upload,
  Power,
  PowerOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const ProductList = () => {
  const { 
    products, 
    deleteProduct, 
    deleteAllProducts, 
    isLoading, 
    fetchProducts, 
    publishAllProducts, 
    toggleProductStatus 
  } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toggleStatus, setToggleStatus] = useState<{ id: number, action: 'enable' | 'disable' } | null>(null);
  const { toast } = useToast();
  const [productsLoaded, setProductsLoaded] = useState(false);

  // Check if products are already loaded when the component mounts
  useEffect(() => {
    if (products.length > 0) {
      setProductsLoaded(true);
    }
  }, [products]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchProducts();
      toast({
        title: "Success",
        description: "Products refreshed successfully",
      });
      setProductsLoaded(true);
    } catch (error) {
      console.error("Error refreshing products:", error);
      toast({
        title: "Error",
        description: "Failed to refresh products",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handlePublishAll = async () => {
    try {
      setPublishing(true);
      const success = await publishAllProducts();
      
      if (success) {
        toast({
          title: "Success",
          description: "All products published successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to publish all products",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error publishing all products:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleToggleStatus = async (id: number, isDisabled: boolean) => {
    try {
      setToggleStatus({ id, action: isDisabled ? 'enable' : 'disable' });
      
      // We're enabling if it was disabled, and disabling if it wasn't
      const success = await toggleProductStatus(id, isDisabled);
      
      if (success) {
        toast({
          title: "Success",
          description: `Product ${isDisabled ? 'enabled' : 'disabled'} successfully`,
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to ${isDisabled ? 'enable' : 'disable'} product`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error ${isDisabled ? 'enabling' : 'disabling'} product:`, error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setToggleStatus(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeleteInProgress(id);
      console.log("Starting delete for product ID:", id);

      const success = await deleteProduct(id);

      if (success) {
        console.log("Product deleted successfully");
        toast({
          title: "Success",
          description: "Product has been deleted successfully",
        });
      } else {
        console.log("Delete operation returned false");
        toast({
          title: "Error",
          description: "Failed to delete the product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting the product",
        variant: "destructive",
      });
    } finally {
      setDeleteInProgress(null);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setDeletingAll(true);
      console.log("Starting delete all products operation");

      const success = await deleteAllProducts();

      if (success) {
        console.log("All products deleted successfully");
        toast({
          title: "Success",
          description: "All products have been deleted successfully",
        });
      } else {
        console.log("Delete all operation returned false");
        toast({
          title: "Error",
          description: "Failed to delete all products",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleDeleteAll:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting all products",
        variant: "destructive",
      });
    } finally {
      setDeletingAll(false);
    }
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fish":
        return <Fish className="h-4 w-4 text-blue-500" />;
      case "inputs":
        return <Fish className="h-4 w-4 text-green-500" />;
      // case "investment":
      //   return <DollarSign className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  // Check if a product is disabled
  const isProductDisabled = (product: any) => {
    return product.tag?.includes('disabled');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-gray-500">Manage your shop products</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="mr-2"
            >
              {refreshing ? (
                <Spinner size="sm" className="mr-2" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={handlePublishAll}
              disabled={publishing || isLoading}
              className="mr-2 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
            >
              {publishing ? (
                <Spinner size="sm" className="mr-2" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Publish All
            </Button>
            <Link to="/admin/products/new">
              <Button className="bg-nanenane-600 hover:bg-nanenane-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Delete All Products Alert Dialog */}
        <div className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* <Button variant="destructive" className="mr-2" disabled={deletingAll || isLoading}>
                {deletingAll ? (
                  <Spinner size="sm" className="mr-2" />
                ) : (
                  <Trash className="mr-2 h-4 w-4" />
                )}
                Delete All Products
              </Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete All Products</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete all products? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAll}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-nanenane-600" : ""}
            >
              <Filter className="mr-2 h-4 w-4" />
              All Products
            </Button>
            <Button
              variant={selectedCategory === "fish" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("fish")}
              className={selectedCategory === "fish" ? "bg-blue-600" : ""}
            >
              <Fish className="mr-2 h-4 w-4" />
              Fish
            </Button>
            <Button
              variant={selectedCategory === "inputs" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("inputs")}
              className={selectedCategory === "inputs" ? "bg-green-600" : ""}
            >
              <LeafyGreen className="mr-2 h-4 w-4" />
              Nile Perch
            </Button>
            {/* <Button
              variant={selectedCategory === "investment" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("investment")}
              className={selectedCategory === "investment" ? "bg-amber-600" : ""}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Investment
            </Button> */}
          </div>

          {!productsLoaded && !refreshing ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Click Refresh to load products.</p>
            </div>
          ) : isLoading && deleteInProgress === null && !deletingAll && !publishing && !toggleStatus ? (
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
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const disabled = isProductDisabled(product);
                    return (
                      <TableRow key={product.id} className={disabled ? "opacity-60" : ""}>
                        <TableCell>
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://placehold.co/600x400?text=Image+Error";
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                          {product.tag && !disabled && (
                            <Badge variant="outline" className="ml-2 bg-gray-100">
                              {product.tag.replace(/,?\s*disabled\s*,?/g, '').trim()}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getCategoryIcon(product.category)}
                            <span className="ml-2">
                              {product.category === "fish"
                                ? "Tilapia"
                                : product.category === "inputs"
                                ? "Nile Perch"
                                : "Investment"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          {disabled ? (
                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                              Disabled
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              Active
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleToggleStatus(product.id, disabled)}
                              disabled={toggleStatus?.id === product.id}
                              className={disabled ? 
                                "text-green-500 hover:text-green-700 hover:bg-green-50" : 
                                "text-red-500 hover:text-red-700 hover:bg-red-50"}
                            >
                              {toggleStatus?.id === product.id ? (
                                <Spinner size="sm" />
                              ) : disabled ? (
                                <Power className="h-4 w-4" />
                              ) : (
                                <PowerOff className="h-4 w-4" />
                              )}
                            </Button>
                            <Link to={`/admin/products/edit/${product.id}`}>
                              <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                    disabled={deleteInProgress === product.id}
                                  >
                                    {deleteInProgress === product.id ? (
                                      <>
                                        <Spinner className="mr-2" size="sm" />
                                        Deleting...
                                      </>
                                    ) : (
                                      "Delete"
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductList;
