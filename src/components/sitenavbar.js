import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import icon from "../images/triangle.svg";

const SiteNavbar = () => {
  // Query title
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  // Title of blog
  const title = data.site.siteMetadata.title;

  return (
    <Navbar id="navbar" bg="light">
      <Navbar.Brand as={Link} to="/">
        <img className="icon" src={icon} alt="Icon for blog"/>
        {/* Hide only on sm */}
        <span className="ml-2 h4 align-middle d-none d-sm-inline">{title}</span>
      </Navbar.Brand>

      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/about">
          About
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default SiteNavbar;
