
import { supabase } from "@/integrations/supabase/client";

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at?: string;
}

export const fetchCategoriesFromApi = async (): Promise<Category[]> => {
    console.log("Fetching categories from Supabase...");

    const { data, error } = await supabase
        .from("product_categories")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("Supabase error fetching categories:", error);
        // If table doesn't exist yet, return default empty list or handle gracefully
        // But throwing error is better to alert dev.
        // However, since we want to be robust, maybe fallback to empty if it 404s? 
        // Supabase usually returns error code for missing table.
        // For now we assume table exists as per user request context.
        throw error;
    }

    return data || [];
};

export const addCategoryToApi = async (name: string): Promise<Category> => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    console.log("Adding category:", name);

    const { data, error } = await supabase
        .from("product_categories")
        .insert({ name, slug })
        .select()
        .single();

    if (error) {
        console.error("Supabase error adding category:", error);
        throw error;
    }

    return data;
};

export const deleteCategoryFromApi = async (id: number): Promise<void> => {
    console.log("Deleting category with ID:", id);

    const { error } = await supabase
        .from("product_categories")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Supabase error deleting category:", error);
        throw error;
    }
};
