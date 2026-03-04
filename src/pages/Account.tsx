import { useState } from "react";
import { User, Music, ShoppingBag, Download, Settings, LogOut, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

const purchaseHistory = [
  { id: "p1", beatTitle: "Midnight Drive", date: "Feb 20, 2026", price: 29.99, license: "Premium", genre: "Trap" },
  { id: "p2", beatTitle: "City Lights", date: "Jan 15, 2026", price: 19.99, license: "Basic", genre: "Lo-Fi" },
  { id: "p3", beatTitle: "Neon Dreams", date: "Jan 3, 2026", price: 29.99, license: "Premium", genre: "R&B" },
];

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("Artist Name");
  const [editName, setEditName] = useState(displayName);
  const [activeTab, setActiveTab] = useState<"purchases" | "settings">("purchases");

  const saveName = () => {
    setDisplayName(editName);
    setIsEditing(false);
  };

  return (
    <PageLayout>
      <div className="px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Profile Header */}
          <div className="glass-panel p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-10 text-xl font-bold bg-secondary/50 border-primary max-w-xs"
                      onKeyDown={(e) => e.key === "Enter" && saveName()}
                      autoFocus
                    />
                    <Button size="icon" variant="ghost" onClick={saveName} className="text-primary">
                      <Check className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">{displayName}</h1>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => { setEditName(displayName); setIsEditing(true); }}
                      className="text-foreground-muted hover:text-foreground w-7 h-7"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
                <p className="text-foreground-muted text-sm">artist@example.com</p>

                <div className="flex items-center gap-4 sm:gap-6 mt-4 flex-wrap">
                  <div className="text-center">
                    <div className="font-display text-lg sm:text-xl font-bold text-foreground">{purchaseHistory.length}</div>
                    <div className="text-xs text-foreground-muted">Purchases</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-display text-lg sm:text-xl font-bold text-foreground">
                      ${purchaseHistory.reduce((s, p) => s + p.price, 0).toFixed(2)}
                    </div>
                    <div className="text-xs text-foreground-muted">Spent</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-display text-lg sm:text-xl font-bold text-foreground">Member</div>
                    <div className="text-xs text-foreground-muted">Since Jan 2026</div>
                  </div>
                </div>
              </div>

              {/* Sign Out */}
              <Link to="/login" className="self-start sm:self-auto">
                <Button variant="outline" size="sm" className="text-foreground-muted">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-border">
            <button
              onClick={() => setActiveTab("purchases")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "purchases"
                  ? "border-primary text-foreground"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Purchase History</span>
              <span className="sm:hidden">Purchases</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-primary text-foreground"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "purchases" && (
            <div className="space-y-3 sm:space-y-4">
              {purchaseHistory.length === 0 ? (
                <div className="glass-panel p-12 text-center">
                  <Music className="w-12 h-12 mx-auto text-foreground-subtle mb-3" />
                  <p className="text-foreground-muted">No purchases yet</p>
                  <Link to="/beats" className="mt-4 inline-block">
                    <Button variant="hero" size="sm">Browse Beats</Button>
                  </Link>
                </div>
              ) : (
                purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="glass-panel p-4 sm:p-5 flex items-center gap-3 sm:gap-5 flex-wrap sm:flex-nowrap">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center shrink-0">
                      <Music className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{purchase.beatTitle}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{purchase.genre}</Badge>
                        <Badge variant="outline" className="text-xs">{purchase.license}</Badge>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display font-bold text-foreground">${purchase.price}</div>
                      <div className="text-xs text-foreground-muted mt-0.5">{purchase.date}</div>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0 w-full sm:w-auto">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="glass-panel p-5 sm:p-8 space-y-6 max-w-lg">
              <h2 className="font-display text-lg font-semibold text-foreground">Account Settings</h2>

              <div className="space-y-2">
                <label className="text-sm text-foreground-muted">Display Name</label>
                <Input
                  defaultValue={displayName}
                  className="h-11 bg-secondary/50 border-border-subtle focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-foreground-muted">Email</label>
                <Input
                  defaultValue="artist@example.com"
                  type="email"
                  className="h-11 bg-secondary/50 border-border-subtle focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-foreground-muted">New Password</label>
                <Input
                  type="password"
                  placeholder="Leave blank to keep current"
                  className="h-11 bg-secondary/50 border-border-subtle focus:border-primary"
                />
              </div>

              <Button variant="hero" className="w-full">Save Changes</Button>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground-muted mb-3">Danger Zone</p>
                <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AccountPage;
