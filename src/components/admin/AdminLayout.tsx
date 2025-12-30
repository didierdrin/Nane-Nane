
import { ReactNode, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

// Default content
const defaultAdminContent = {
  header: {
    title: "Nane Nane Admin Portal",
    subtitle: "Manage your tech-enabled fish farming business - products, inventory, and operations."
  },
  footer: {
    text: "Nane Nane Fish Farm Admin Portal"
  }
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [adminContent, setAdminContent] = useState(defaultAdminContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminContent();
  }, []);

  const loadAdminContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading admin content:', error);
      }

      if (data?.content?.admin) {
        setAdminContent(data.content.admin);
      }
    } catch (error) {
      console.error('Error loading admin content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-700">
            {loading ? "Loading..." : adminContent.header.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {loading ? "Please wait..." : adminContent.header.subtitle}
          </p>
        </div>
        {children}
      </main>
      <footer className="py-4 bg-white border-t text-center text-sm text-gray-600">
        <p>{loading ? "Loading..." : adminContent.footer.text} © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
