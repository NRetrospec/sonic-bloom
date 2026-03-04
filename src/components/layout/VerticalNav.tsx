import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Music,
  Grid3X3,
  ShoppingCart,
  User,
  Heart,
  X
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge?: number;
  onNavigate?: () => void;
}

const NavItem = ({ to, icon, label, isActive, badge, onNavigate }: NavItemProps) => (
  <Link
    to={to}
    onClick={onNavigate}
    className={cn(
      "nav-link",
      isActive && "active"
    )}
  >
    <div className="relative">
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

interface VerticalNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const VerticalNav = ({ isOpen = false, onClose }: VerticalNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { cartCount } = useCart();

  const mainNavItems = [
    { to: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    { to: "/beats", icon: <Music className="w-5 h-5" />, label: "Browse Beats" },
    { to: "/genres", icon: <Grid3X3 className="w-5 h-5" />, label: "Genres" },
    { to: "/favorites", icon: <Heart className="w-5 h-5" />, label: "Favorites" },
  ];

  const accountNavItems = [
    { to: "/cart", icon: <ShoppingCart className="w-5 h-5" />, label: "Cart", badge: cartCount },
    { to: "/account", icon: <User className="w-5 h-5" />, label: "Account" },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col",
          "transition-transform duration-300 ease-in-out",
          // Desktop: always visible. Mobile: slide in/out
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              BEATVAULT
            </span>
          </Link>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-6 overflow-y-auto">
          <div className="px-4 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Menu
            </span>
          </div>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                isActive={currentPath === item.to}
                onNavigate={onClose}
              />
            ))}
          </div>

          <div className="px-4 mt-8 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </span>
          </div>
          <div className="space-y-1">
            {accountNavItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                isActive={currentPath === item.to}
                onNavigate={onClose}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            to="/login"
            onClick={onClose}
            className="nav-link justify-center bg-primary/10 hover:bg-primary/20 rounded-lg text-primary"
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-semibold">Sign In</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default VerticalNav;
