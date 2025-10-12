
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/adminAuth";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Check Supabase auth
      const { data: { session } } = await supabase.auth.getSession();
      const isSupabaseAuth = !!session;
      
      // For development purposes, we'll also accept session storage auth
      const simpleAuth = isAuthenticated();
      
      setAuthenticated(isSupabaseAuth || simpleAuth);
      setLoading(false);
    };
    
    checkAuth();
    
    // Add auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAuthenticated(true);
        } else {
          // If no Supabase session, fall back to simple auth
          const simpleAuth = isAuthenticated();
          setAuthenticated(simpleAuth);
        }
      }
    );
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return authenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
