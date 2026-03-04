import { Trash2, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  const tax = cartTotal * 0.1;
  const total = cartTotal + tax;

  return (
    <PageLayout>
      <div className="px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Your Cart</h1>
            <p className="text-foreground-muted mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="glass-panel p-12 sm:p-16 text-center">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="glass-panel p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-6 flex-wrap sm:flex-nowrap">
                      {/* Cover */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
                        {item.coverUrl ? (
                          <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-secondary to-background" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/beats/${item.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                        </Link>
                        <p className="text-sm text-foreground-muted">{item.producer}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {item.genre}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.licenseType}
                          </Badge>
                        </div>
                      </div>

                      {/* Price & Actions — right side on sm+, full row on mobile */}
                      <div className="w-full sm:w-auto flex items-center justify-between sm:block sm:text-right shrink-0">
                        <div className="font-display font-bold text-lg sm:text-xl text-foreground">
                          ${item.finalPrice.toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 sm:mt-2"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-panel p-5 sm:p-6 lg:sticky lg:top-8">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground-muted">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
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
      </div>
    </PageLayout>
  );
};

export default CartPage;
