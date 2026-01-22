import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VerticalNav from "@/components/layout/VerticalNav";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  title: string;
  producer: string;
  genre: string;
  price: number;
  licenseType: string;
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    title: "Midnight Drive",
    producer: "BEATVAULT",
    genre: "Trap",
    price: 29.99,
    licenseType: "Premium",
  },
  {
    id: "2",
    title: "City Lights",
    producer: "BEATVAULT",
    genre: "Lo-Fi",
    price: 19.99,
    licenseType: "Basic",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background">
      <VerticalNav />
      
      <main className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Your Cart</h1>
            <p className="text-foreground-muted mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="glass-panel p-16 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-foreground-subtle mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-foreground-muted mb-6">
                Start browsing beats to add them to your cart
              </p>
              <Link to="/beats">
                <Button variant="hero">
                  Browse Beats
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel p-6 flex items-center gap-6"
                  >
                    {/* Cover */}
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/30 via-secondary to-background shrink-0" />
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground-muted">{item.producer}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.genre}
                        </Badge>
                        <Badge variant="genre" className="text-xs">
                          {item.licenseType}
                        </Badge>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="text-right shrink-0">
                      <div className="font-display font-bold text-xl text-foreground">
                        ${item.price}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-panel p-6 sticky top-8">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground-muted">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground-muted">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-foreground font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Checkout
                  </Button>

                  <p className="text-xs text-foreground-subtle text-center mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
