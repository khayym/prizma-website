import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-white">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <BackToTop />
  </div>
);

export default Layout;
