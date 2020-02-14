import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import "../styles/type-on-strap.scss";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
