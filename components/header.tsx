import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { Home, Briefcase } from "lucide-react";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-center container">
        <nav className="max-lg:hidden backdrop-blur-xl bg-background/60 border border-border/50 rounded-full px-2 py-2 shadow-lg shadow-primary/5">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-accent transition-all duration-200 font-medium text-sm"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-accent transition-all duration-200 font-medium text-sm"
            >
              <Briefcase className="w-4 h-4" />
              Projects
            </Link>
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  );
};