import { useState } from "react";
import { cn } from "@/lib/utils";
import VerticalNav from "./VerticalNav";
import MobileTopBar from "./MobileTopBar";
import MiniPlayer from "@/components/player/MiniPlayer";

interface PageLayoutProps {
  children: React.ReactNode;
  mainClassName?: string;
}

const PageLayout = ({ children, mainClassName }: PageLayoutProps) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <VerticalNav isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <MobileTopBar onMenuClick={() => setNavOpen(true)} />
      <main className={cn("lg:ml-64 pb-24 pt-14 lg:pt-0", mainClassName)}>
        {children}
      </main>
      <MiniPlayer />
    </div>
  );
};

export default PageLayout;
