import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

export const PageShell = ({ children, bare = false }: { children: ReactNode; bare?: boolean }) => (
  <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
    <Navbar />
    <main className={bare ? "flex-1 min-w-0" : "flex-1 min-w-0 pt-24 sm:pt-28 pb-mobile-nav md:pb-0"}>{children}</main>
    <Footer />
    <MobileNav />
  </div>
);
