import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const PageShell = ({ children, bare = false }: { children: ReactNode; bare?: boolean }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className={bare ? "flex-1" : "flex-1 pt-28"}>{children}</main>
    <Footer />
  </div>
);
