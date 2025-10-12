
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, ProductContextType } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import {
  fetchProductsFromApi,
  addProductToApi,
  updateProductInApi,
  deleteProductFromApi,
  deleteAllProductsFromApi,
  publishAllProductsInApi,
  toggleProductStatusInApi
} from "@/services/productService";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      setIsLoading(true);
      const fetchedProducts = await fetchProductsFromApi();
      setProducts(fetchedProducts);
      return fetchedProducts;
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
      setInitialLoadDone(true);
    }
  };

  // Fetch products on mount - but only once
  useEffect(() => {
    if (!initialLoadDone) {
      fetchProducts();
    }
  }, [initialLoadDone]);

  const addProduct = async (product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<boolean> => {
    try {
      setIsLoading(true);
      const newProduct = await addProductToApi(product);
      
      // Update local state with the new product
      setProducts(prev => [...prev, newProduct]);
      
      toast({
        title: "Success",
        description: "Product added successfully.",
      });
      return true;
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (product: Product): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updatedProduct = await updateProductInApi(product);
      
      // Update local state with the updated product
      setProducts(prev => 
        prev.map(p => p.id === product.id ? updatedProduct : p)
      );
      
      toast({
        title: "Success",
        description: "Product updated successfully.",
      });
      return true;
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      await deleteProductFromApi(id);
      
      // Update local state by removing the deleted product
      setProducts(prev => prev.filter(product => product.id !== id));
      
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
      return true;
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAllProducts = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      await deleteAllProductsFromApi();
      
      // Clear local state
      setProducts([]);
      
      toast({
        title: "Success",
        description: "All products have been deleted successfully",
      });
      
      return true;
    } catch (err) {
      console.error("Error deleting all products:", err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast({
        title: "Error",
        description: "Failed to delete all products. Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const publishAllProducts = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updatedProducts = await publishAllProductsInApi();
      
      // Update local state with the updated products
      setProducts(updatedProducts);
      
      toast({
        title: "Success",
        description: "All products have been published successfully",
      });
      
      return true;
    } catch (err) {
      console.error("Error publishing all products:", err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast({
        title: "Error",
        description: "Failed to publish all products. Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProductStatus = async (id: number, isEnabled: boolean): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updatedProduct = await toggleProductStatusInApi(id, isEnabled);
      
      // Update the local state with the updated product
      setProducts(prev => 
        prev.map(p => p.id === id ? updatedProduct : p)
      );
      
      toast({
        title: "Success",
        description: `Product ${isEnabled ? "enabled" : "disabled"} successfully`,
      });
      
      return true;
    } catch (err) {
      console.error(`Error ${isEnabled ? "enabling" : "disabling"} product:`, err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast({
        title: "Error",
        description: `Failed to ${isEnabled ? "enable" : "disable"} product. Please try again later.`,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    publishAllProducts,
    toggleProductStatus,
    getProductById,
    isLoading,
    error,
    fetchProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
