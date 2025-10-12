
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/contexts/ProductContext";
import { Product } from "@/types/product";

interface FormData {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  whatsapp_message: string;
  tag: string;
}

const initialFormData: FormData = {
  name: "",
  category: "fish",
  price: "",
  image: "",
  description: "",
  whatsapp_message: "",
  tag: "",
};

export const useProductForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const { addProduct, updateProduct, getProductById, fetchProducts, isLoading: contextLoading } = useProducts();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(isEditing);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const imagePlaceholders = {
    fish: [
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      "https://images.unsplash.com/photo-1576779136803-a321b2e7a5c6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      "https://images.unsplash.com/photo-1539797687476-ca8fbd8b5a69?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
    ],
    inputs: [
      "https://images.unsplash.com/photo-1563977471760-4893acdb956c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      "https://images.unsplash.com/photo-1520153585024-123045b4c9ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      "https://images.unsplash.com/photo-1618933974254-c114b5a79e36?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
    ],
    investment: [
      "https://images.unsplash.com/photo-1493654155938-50b2b3b7fa8d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      "https://images.unsplash.com/photo-1595274459742-4a912dbef40c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      "https://images.unsplash.com/photo-1568817210594-dfb735040367?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
    ]
  };

  useEffect(() => {
    if (isEditing && id) {
      const productId = Number(id);
      console.log("Looking for product with ID:", productId);
      
      const product = getProductById(productId);
      
      if (product) {
        console.log("Product found for editing:", product);
        setFormData({
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          description: product.description,
          whatsapp_message: product.whatsapp_message,
          tag: product.tag || "",
        });
        setIsFormLoading(false);
      } else {
        console.log("Product not found, will attempt to refresh data");
        handleRefreshData();
      }
    } else {
      setIsFormLoading(false);
    }
  }, [id, isEditing, getProductById]);

  const handleRefreshData = async () => {
    if (isEditing && id) {
      setIsRefreshing(true);
      try {
        await fetchProducts();
        const productId = Number(id);
        const refreshedProduct = getProductById(productId);
        
        if (refreshedProduct) {
          console.log("Product found after refresh:", refreshedProduct);
          setFormData({
            name: refreshedProduct.name,
            category: refreshedProduct.category,
            price: refreshedProduct.price,
            image: refreshedProduct.image,
            description: refreshedProduct.description,
            whatsapp_message: refreshedProduct.whatsapp_message,
            tag: refreshedProduct.tag || "",
          });
          toast({
            title: "Success",
            description: "Product data refreshed successfully",
          });
        } else {
          console.error("Product not found with ID:", id);
          toast({
            title: "Error",
            description: "Product not found",
            variant: "destructive",
          });
          navigate("/admin/products");
        }
      } catch (error) {
        console.error("Error refreshing product data:", error);
        toast({
          title: "Error",
          description: "Failed to refresh product data",
          variant: "destructive",
        });
      } finally {
        setIsRefreshing(false);
        setIsFormLoading(false);
      }
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }
    
    if (!formData.price.trim()) {
      errors.price = "Price is required";
    }
    
    if (!formData.image.trim()) {
      errors.image = "Image URL is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!formData.whatsapp_message.trim()) {
      errors.whatsapp_message = "WhatsApp message is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (validationErrors[name as keyof FormData]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearError = (field: keyof FormData) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    console.log("Form submitted with data:", formData);

    try {
      if (isEditing && id) {
        console.log("Updating product with ID:", id);
        
        const productToUpdate: Product = {
          id: Number(id),
          name: formData.name,
          category: formData.category,
          price: formData.price,
          image: formData.image,
          description: formData.description,
          whatsapp_message: formData.whatsapp_message,
          tag: formData.tag || undefined
        };
        
        console.log("Sending update with product data:", productToUpdate);
        const success = await updateProduct(productToUpdate);
        
        if (success) {
          toast({
            title: "Success",
            description: "Product updated successfully",
          });
          navigate("/admin/products");
        } else {
          throw new Error("Failed to update product");
        }
      } else {
        console.log("Adding new product");
        
        const success = await addProduct({
          name: formData.name,
          category: formData.category,
          price: formData.price,
          image: formData.image,
          description: formData.description,
          whatsapp_message: formData.whatsapp_message,
          tag: formData.tag || undefined
        });
        
        if (success) {
          toast({
            title: "Success",
            description: "Product added successfully",
          });
          navigate("/admin/products");
        } else {
          throw new Error("Failed to add product");
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "There was an error saving the product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRandomImageForCategory = (category: string) => {
    const images = imagePlaceholders[category as keyof typeof imagePlaceholders] || imagePlaceholders.fish;
    return images[Math.floor(Math.random() * images.length)];
  };

  return {
    formData,
    isEditing,
    isSubmitting,
    isFormLoading,
    isRefreshing,
    validationErrors,
    handleChange,
    handleSelectChange,
    handleRefreshData,
    handleSubmit,
    getRandomImageForCategory,
    clearError
  };
};

export default useProductForm;
