
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface ProductFormActionsProps {
  isSubmitting: boolean;
  isEditing: boolean;
}

const ProductFormActions = ({ isSubmitting, isEditing }: ProductFormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-3">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate("/admin/products")}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="bg-nanenane-600 hover:bg-nanenane-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner className="mr-2" size="sm" />
            {isEditing ? "Updating..." : "Saving..."}
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? "Update Product" : "Save Product"}
          </>
        )}
      </Button>
    </div>
  );
};

export default ProductFormActions;
