import { Link } from "wouter";
import { Product } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, BarChart2 } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleWishlist, wishlist, toggleCompare, compareList } = useCart();
  const { toast } = useToast();
  
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  
  const displayPrice = product.discount || product.price;
  const hasDiscount = product.discount && product.discount < product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng của bạn.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCompare(product.id);
  };

  return (
    <Card className="group overflow-hidden flex flex-col h-full hover-elevate transition-all duration-300 border-border/50 hover:border-primary/50">
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Link href={`/san-pham/${product.slug}`} className="block w-full h-full">
          <img 
            src={product.thumbnail || "https://placehold.co/400x400/e2e8f0/64748b?text=No+Image"} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <Badge variant="destructive" className="font-bold">
              -{Math.round((1 - (product.discount || 0) / product.price) * 100)}%
            </Badge>
          )}
          {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">Mới</Badge>}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            size="icon" 
            variant="secondary" 
            className={`rounded-full shadow-md w-8 h-8 ${isWishlisted ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={handleWishlist}
            title="Yêu thích"
          >
            <Heart className={isWishlisted ? "fill-current w-4 h-4" : "w-4 h-4"} />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className={`rounded-full shadow-md w-8 h-8 ${isCompared ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={handleCompare}
            title="So sánh"
          >
            <BarChart2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-muted-foreground mb-1">{product.brandName || "TDM Shop"}</div>
        <Link href={`/san-pham/${product.slug}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 leading-tight min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-destructive">
              {formatCurrency(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          
          <Button 
            size="icon" 
            className="rounded-full w-9 h-9 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
