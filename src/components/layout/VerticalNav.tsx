import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Music, 
  Grid3X3, 
  ShoppingCart, 
  User,
  Heart
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "nav-link",
      isActive && "active"
    )}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const VerticalNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const mainNavItems = [
    { to: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    { to: "/beats", icon: <Music className="w-5 h-5" />, label: "Browse Beats" },
    { to: "/genres", icon: <Grid3X3 className="w-5 h-5" />, label: "Genres" },
    { to: "/favorites", icon: <Heart className="w-5 h-5" />, label: "Favorites" },
  ];

  const accountNavItems = [
    { to: "/cart", icon: <ShoppingCart className="w-5 h-5" />, label: "Cart" },
    { to: "/account", icon: <User className="w-5 h-5" />, label: "Account" },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Music className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            BEATVAULT
          </span>
        </Link>
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
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/login"
          className="nav-link justify-center bg-primary/10 hover:bg-primary/20 rounded-lg text-primary"
        >
          <User className="w-5 h-5" />
          <span className="text-sm font-semibold">Sign In</span>
        </Link>
      </div>
    </nav>
  );
};

export default VerticalNav;
