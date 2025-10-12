
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormBasicFieldsProps {
  name: string;
  category: string;
  price: string;
  tag: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const ProductFormBasicFields = ({ 
  name, 
  category, 
  price, 
  tag, 
  errors, 
  onChange, 
  onSelectChange 
}: ProductFormBasicFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
          Product Name *
        </Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="category">Category *</Label>
        <Select
          value={category}
          onValueChange={(value) => onSelectChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fish">Fish Products</SelectItem>
            <SelectItem value="inputs">Nile Perch</SelectItem>
            {/* <SelectItem value="investment">Investment Opportunities</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="price" className={errors.price ? "text-red-500" : ""}>
          Size *
        </Label>
        <Input
          id="price"
          name="price"
          value={price}
          onChange={onChange}
          placeholder="e.g. Size: 1kg, 2kg, 3kg"
          className={errors.price ? "border-red-500" : ""}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>

      <div>
        <Label htmlFor="tag">Tag (Optional)</Label>
        <Input
          id="tag"
          name="tag"
          value={tag}
          onChange={onChange}
          placeholder="e.g. Popular, New, Best Seller"
        />
      </div>
    </div>
  );
};

export default ProductFormBasicFields;
