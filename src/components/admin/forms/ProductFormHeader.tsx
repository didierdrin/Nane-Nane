
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface ProductFormHeaderProps {
  isEditing: boolean;
  isRefreshing: boolean;
  onRefreshData: () => void;
}

const ProductFormHeader = ({ isEditing, isRefreshing, onRefreshData }: ProductFormHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-gray-500">
          {isEditing ? "Update product details" : "Create a new product"}
        </p>
      </div>
      <div className="flex space-x-2">
        {isEditing && (
          <Button 
            variant="outline" 
            onClick={onRefreshData}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Spinner className="mr-2" size="sm" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh Data
          </Button>
        )}
        <Button variant="outline" onClick={() => navigate("/admin/products")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    </div>
  );
};

export default ProductFormHeader;
