import React from "react";
import Navbar from "./Navbar";

type Props = { children: React.ReactNode };

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
