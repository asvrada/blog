import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import "../styles/main.scss";

const Layout = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <Navbar showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
      <main className={`main-body`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;