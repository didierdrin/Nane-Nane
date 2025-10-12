
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFormImageFieldProps {
  image: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getRandomImage: (category: string) => string;
  category: string;
  onClearErrors: (field: string) => void;
}

const ProductFormImageField = ({ 
  image, 
  errors, 
  onChange, 
  getRandomImage,
  category,
  onClearErrors
}: ProductFormImageFieldProps) => {
  return (
    <div>
      <Label htmlFor="image" className={errors.image ? "text-red-500" : ""}>
        Image URL *
      </Label>
      <div className="flex gap-2">
        <Input
          id="image"
          name="image"
          value={image}
          onChange={onChange}
          placeholder="https://example.com/image.jpg"
          className={errors.image ? "border-red-500" : ""}
        />
        <Button 
          type="button" 
          variant="outline"
          onClick={() => {
            const randomImage = getRandomImage(category);
            // Using a custom event to simulate onChange
            const syntheticEvent = {
              target: {
                name: 'image',
                value: randomImage
              }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
            onClearErrors("image");
          }}
        >
          Sample
        </Button>
      </div>
      {errors.image && (
        <p className="text-red-500 text-sm mt-1">{errors.image}</p>
      )}
      {image && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Preview:</p>
          <div className="w-full h-40 border rounded-md overflow-hidden">
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFormImageField;
