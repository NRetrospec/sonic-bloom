import { Menu, Music, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

interface MobileTopBarProps {
  onMenuClick: () => void;
}

const MobileTopBar = ({ onMenuClick }: MobileTopBarProps) => {
  const { cartCount } = useCart();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-sidebar/95 backdrop-blur-xl border-b border-sidebar-border z-30 flex items-center justify-between px-4">
      <button
        onClick={onMenuClick}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Music className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display text-lg font-bold text-foreground">BEATVAULT</span>
      </Link>

      <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        )}
      </Link>
    </header>
  );
};

export default MobileTopBar;
