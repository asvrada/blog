import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FaAlignJustify, FaSearch, FaTags } from "react-icons/fa";

import icon from "../images/triangle.svg";

const SiteNavbar = ({ showDropdown, setShowDropdown }) => {
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
    <Navbar id="navbar" bg="light" expand="sm">
      <Link to="/">
        <Navbar.Brand href="">
          <img className="icon" src={icon} alt="Icon for blog"/>
          <span className="ml-2 h3 align-middle">{title}</span>
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} href="/">
            Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SiteNavbar;
