import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import "../styles/main.scss";

const Layout = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <Navbar showDropdown={showDropdown} setShowDropdown={setShowDropdown}/>

      <main className={`container`}>{children}</main>

      <Footer/>
    </div>
  );
};

export default Layout;
