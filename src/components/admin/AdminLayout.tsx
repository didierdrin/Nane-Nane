
import { ReactNode } from "react";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-700">Nane Nane Admin Portal</h3>
          <p className="text-gray-600 text-sm">
            Manage your tech-enabled fish farming business - products, inventory, and operations.
          </p>
        </div>
        {children}
      </main>
      <footer className="py-4 bg-white border-t text-center text-sm text-gray-600">
        <p>Nane Nane Fish Farm Admin Portal © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
