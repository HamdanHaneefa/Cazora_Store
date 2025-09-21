import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { X, Plus, Minus } from "lucide-react";

const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.quantity) {
      setQuantity(newQuantity);
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="aspect-video overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-card-foreground mb-2">
                {product.title}
              </h2>
              
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
                
                <span className="text-sm text-muted-foreground">
                  {product.quantity} available
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                    className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 text-sm"
                >
                  Close
                </Button>
                
                <Button 
                  className="flex-1 text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    // TODO: Add to cart functionality
                    console.log(`Added ${quantity}x ${product.title} to cart`);
                    onClose();
                  }}
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;