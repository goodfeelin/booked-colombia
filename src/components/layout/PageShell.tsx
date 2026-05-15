import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

export const PageShell = ({ children, bare = false }: { children: ReactNode; bare?: boolean }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <main className={bare ? "flex-1" : "flex-1 pt-28"}>{children}</main>
    <Footer />
    <MobileNav />
    <div className="md:hidden h-24" aria-hidden />
  </div>
);
