import React from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-primary px-3 py-2 text-white">
      <Header />
      {children}
    </main>
  );
};

export default Layout;
