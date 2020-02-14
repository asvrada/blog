import React from "react";

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
