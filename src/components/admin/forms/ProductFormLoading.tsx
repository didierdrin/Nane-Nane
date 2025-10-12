
import AdminLayout from "@/components/admin/AdminLayout";
import { Spinner } from "@/components/ui/spinner";

const ProductFormLoading = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block mb-4">
            <Spinner size="lg" />
          </div>
          <p className="text-gray-500">Loading product data...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductFormLoading;
