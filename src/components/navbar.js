import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import { FaAlignJustify, FaSearch, FaTags } from "react-icons/fa";

import icon from "../images/triangle.svg";

const Navbar = ({ showDropdown, setShowDropdown }) => {
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
    <div className="full-container">
      <div className="flex-row branding-container">
        {/*Logo*/}
        <div className="flex-small">
          <Link className="logo inline-block" to={`/`}>
            <img className="" src={icon} alt="icon"/>
          </Link>

          <Link className="inline-block title" to={`/`}>{title}</Link>
        </div>

        {/*Menu*/}
        <nav className="flex-small navbar">
          <button className="fake-button"
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}>
            <FaAlignJustify/>
          </button>
        </nav>
      </div>

      <div className={`dropdown-menu` + (showDropdown ? "" : " hide")}>
        <ul className="">
          {/* About page */}
          <li>
            <Link to={`/about`}>About</Link>
          </li>

          {/* Portfolio page*/}
          <li>
            <Link to={`/portfolio`}>Portfolio</Link>
          </li>

          {/*Search page*/}
          <li>
            <Link to={`/search`}>
              <FaSearch/>
            </Link>
          </li>

          {/*tags page*/}
          <li>
            <Link to={`/tags`}>
              <FaTags/>
            </Link>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Navbar;
