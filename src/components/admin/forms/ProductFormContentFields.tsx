
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ProductFormContentFieldsProps {
  description: string;
  whatsappMessage: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProductFormContentFields = ({ 
  description, 
  whatsappMessage, 
  errors, 
  onChange 
}: ProductFormContentFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description" className={errors.description ? "text-red-500" : ""}>
          Description *
        </Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={onChange}
          rows={4}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <Label htmlFor="whatsapp_message" className={errors.whatsapp_message ? "text-red-500" : ""}>
          Custom WhatsApp Message *
        </Label>
        <Input
          id="whatsapp_message"
          name="whatsapp_message"
          value={whatsappMessage}
          onChange={onChange}
          placeholder="Hello, I would like to order..."
          className={errors.whatsapp_message ? "border-red-500" : ""}
        />
        {errors.whatsapp_message && (
          <p className="text-red-500 text-sm mt-1">{errors.whatsapp_message}</p>
        )}
      </div>
    </div>
  );
};

export default ProductFormContentFields;
