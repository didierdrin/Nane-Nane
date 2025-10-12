
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  whatsapp_message: string;
  tag?: string;
  created_at?: string;
  updated_at?: string;
  is_enabled?: boolean;
}

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "created_at" | "updated_at">) => Promise<boolean>;
  updateProduct: (product: Product) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<boolean>;
  deleteAllProducts: () => Promise<boolean>;
  publishAllProducts: () => Promise<boolean>;
  toggleProductStatus: (id: number, isEnabled: boolean) => Promise<boolean>;
  getProductById: (id: number) => Product | undefined;
  isLoading: boolean;
  error: Error | null;
  fetchProducts: () => Promise<Product[]>;
}
