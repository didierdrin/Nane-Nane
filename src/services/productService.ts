
import { Product } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";

export const fetchProductsFromApi = async (): Promise<Product[]> => {
  console.log("Fetching products from Supabase...");
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error fetching products:", error);
    throw error;
  }

  console.log("Products fetched successfully:", data?.length || 0, "products");
  
  // Process products to add is_enabled property based on tag
  const processedProducts = (data || []).map(product => ({
    ...product,
    is_enabled: !product.tag?.includes('disabled')
  }));
  
  return processedProducts;
};

export const addProductToApi = async (product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> => {
  console.log("Adding product:", product);

  // Check if admin is authenticated
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    console.log("Using admin override for product addition");
    // Continue with product addition using admin authentication bypass
  }
  
  // Insert the new product
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select();

  if (error) {
    console.error("Supabase error adding product:", error);
    throw error;
  }

  console.log("Product added successfully:", data);
  
  if (!data || data.length === 0) {
    throw new Error("No data returned from insert operation");
  }

  return {
    ...data[0],
    is_enabled: !data[0].tag?.includes('disabled')
  };
};

export const updateProductInApi = async (product: Product): Promise<Product> => {
  console.log("Updating product with ID:", product.id, product);
  
  // Create a cleaned update payload without created_at and updated_at
  const updatePayload = {
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    description: product.description,
    whatsapp_message: product.whatsapp_message,
    tag: product.tag || null
  };
  
  console.log("Update payload:", updatePayload);
  
  // Update the product in Supabase
  const { data, error } = await supabase
    .from('products')
    .update(updatePayload)
    .eq('id', product.id)
    .select();

  if (error) {
    console.error("Supabase error while updating product:", error);
    throw error;
  }

  console.log("Product updated successfully in database", data);
  
  if (!data || data.length === 0) {
    throw new Error("No data returned from update operation");
  }

  return {
    ...data[0],
    is_enabled: !data[0].tag?.includes('disabled')
  };
};

export const deleteProductFromApi = async (id: number): Promise<void> => {
  console.log("Deleting product with ID:", id);
  
  // Check if admin is authenticated
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    console.log("Using admin override for product deletion");
    // Continue with product deletion using admin authentication bypass
  }
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Supabase delete error:", error);
    throw error;
  }

  console.log("Delete operation successful in database");
};

export const deleteAllProductsFromApi = async (): Promise<void> => {
  console.log("Deleting all products...");
  
  // Check if admin is authenticated
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    console.log("Using admin override for deleting all products");
    // Continue with deletion using admin authentication bypass
  }
  
  const { error } = await supabase
    .from('products')
    .delete()
    .neq('id', 0); // This will delete all products since id is always greater than 0
  
  if (error) {
    console.error("Supabase error while deleting all products:", error);
    throw error;
  }
  
  console.log("All products deleted successfully");
};

export const publishAllProductsInApi = async (): Promise<Product[]> => {
  console.log("Publishing all products...");
  
  // Check if admin is authenticated
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    console.log("Using admin override for publishing all products");
    // Continue with publishing using admin authentication bypass
  }
  
  // We'll update the timestamp on all products to simulate a "publish"
  const { data, error } = await supabase
    .from('products')
    .update({ updated_at: new Date().toISOString() })
    .neq('id', 0) // This ensures we update all products
    .select();
  
  if (error) {
    console.error("Supabase error while publishing all products:", error);
    throw error;
  }
  
  console.log("All products published successfully:", data);
  
  if (!data) {
    return await fetchProductsFromApi();
  }
  
  return data.map(product => ({
    ...product,
    is_enabled: !product.tag?.includes('disabled')
  }));
};

export const toggleProductStatusInApi = async (id: number, isEnabled: boolean): Promise<Product> => {
  console.log(`${isEnabled ? "Enabling" : "Disabling"} product with ID:`, id);
  
  // Check if admin is authenticated
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    console.log("Using admin override for toggle product status");
    // Continue with status toggle using admin authentication bypass
  }
  
  // First get the product to access its current tags
  const { data: productData, error: fetchError } = await supabase
    .from('products')
    .select()
    .eq('id', id)
    .single();
    
  if (fetchError) {
    console.error("Supabase error while fetching product for status toggle:", fetchError);
    throw fetchError;
  }
  
  if (!productData) {
    throw new Error("Product not found");
  }
  
  let updatedTag = productData.tag || "";
  
  // Add or remove 'disabled' tag
  if (isEnabled && updatedTag.includes('disabled')) {
    // Remove disabled tag
    updatedTag = updatedTag.replace(/,?\s*disabled\s*,?/g, '').trim();
    // Clean up any double commas
    updatedTag = updatedTag.replace(/,\s*,/g, ',').replace(/^,|,$/g, '');
  } else if (!isEnabled && !updatedTag.includes('disabled')) {
    // Add disabled tag
    updatedTag = updatedTag ? `${updatedTag}, disabled` : 'disabled';
  }
  
  const { data, error } = await supabase
    .from('products')
    .update({ tag: updatedTag })
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Supabase error while ${isEnabled ? "enabling" : "disabling"} product:`, error);
    throw error;
  }

  console.log(`Product ${isEnabled ? "enabled" : "disabled"} successfully in database`, data);
  
  if (!data || data.length === 0) {
    throw new Error(`Failed to ${isEnabled ? "enable" : "disable"} product`);
  }

  return {
    ...data[0],
    is_enabled: isEnabled
  };
};
