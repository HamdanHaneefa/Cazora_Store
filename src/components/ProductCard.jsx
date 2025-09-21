import { motion } from "framer-motion";
import { Button } from "./ui/button";

const ProductCard = ({ product, onViewDetails, delay = 0 }) => {
  const handleClick = () => {
    if (product.type === "affiliate") {
      window.open(product.affiliateLink, "_blank");
    } else {
      onViewDetails(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-card rounded-lg overflow-hidden card-elevated group cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-semibold text-card-foreground mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
          
          {product.type === "normal" && product.quantity && (
            <span className="text-xs text-muted-foreground">
              {product.quantity} left
            </span>
          )}
        </div>
        
        <Button
          className={`w-full mt-3 text-sm ${
            product.type === "affiliate" 
              ? "bg-accent hover:bg-accent/80 text-accent-foreground" 
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {product.type === "affiliate" ? "Buy Now" : "View Details"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;