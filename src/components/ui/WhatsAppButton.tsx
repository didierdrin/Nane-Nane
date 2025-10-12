
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  text: string;
  phoneNumber: string;
  message?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  className?: string;
}

const WhatsAppButton = ({
  text,
  phoneNumber,
  message = "Hello, I'm interested in Nane Nane's products/services.",
  variant = "default",
  className = "",
}: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    // Format phone number - remove any non-numeric characters
    const formattedNumber = phoneNumber.replace(/\D/g, "");
    
    // Create WhatsApp URL with phone number and encoded message
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleWhatsAppClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <Phone size={16} />
      {text}
    </Button>
  );
};

export default WhatsAppButton;
