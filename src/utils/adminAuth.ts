// Simple admin authentication utility for development
// This file now works as a bridge between simple session storage and Supabase auth
import { supabase } from "@/integrations/supabase/client";

export const isAuthenticated = (): boolean => {
  // Check session storage for backwards compatibility
  return sessionStorage.getItem("adminAuthenticated") === "true";
};

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Supabase auth error:", error);
      return false;
    }
    
    // Set session storage as fallback
    sessionStorage.setItem("adminAuthenticated", "true");
    return true;
  } catch (err) {
    console.error("Error during login:", err);
    return false;
  }
};

export const signUp = async (email: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      console.error("Supabase sign-up error:", error);
      return false;
    }
    
    // Optionally set session storage for consistency
    sessionStorage.setItem("adminAuthenticated", "true");
    return true;
  } catch (err) {
    console.error("Error during sign-up:", err);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Error during Supabase logout:", err);
  } finally {
    // Always clear session storage
    sessionStorage.removeItem("adminAuthenticated");
  }
};

// // Simple admin authentication utility for development
// // This file now works as a bridge between simple session storage and Supabase auth
// import { supabase } from "@/integrations/supabase/client";

// export const isAuthenticated = (): boolean => {
//   // Check session storage for backwards compatibility
//   return sessionStorage.getItem("adminAuthenticated") === "true";
// };

// export const login = async (email: string, password: string): Promise<boolean> => {
//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
    
//     if (error) {
//       console.error("Supabase auth error:", error);
//       return false;
//     }
    
//     // Set session storage as fallback
//     sessionStorage.setItem("adminAuthenticated", "true");
//     return true;
//   } catch (err) {
//     console.error("Error during login:", err);
//     return false;
//   }
// };

// export const logout = async (): Promise<void> => {
//   try {
//     // Sign out from Supabase
//     await supabase.auth.signOut();
//   } catch (err) {
//     console.error("Error during Supabase logout:", err);
//   } finally {
//     // Always clear session storage
//     sessionStorage.removeItem("adminAuthenticated");
//   }
// };
