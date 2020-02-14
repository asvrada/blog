import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import { FaSearch, FaTags } from "react-icons/fa";

import icon from "../images/triangle.svg";

const Navbar = () => {
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
    <div className="site-header">
      {/*Logo*/}
      <div className="branding">
        <Link to={`/`}>
          <img className="avatar" src={icon} alt="icon" />
        </Link>

        <h1 className="site-title">
          <Link to={`/`}>{title}</Link>
        </h1>
      </div>

      {/*Menu*/}
      <nav className="clear">
        {/*<i className="fa fa-bars fa-lg"></i>*/}

        <ul>
          {/* About page */}
          <li>
            <Link to={`/about`}>About</Link>
          </li>

          <li className="separator">|</li>

          {/* Portfolio page*/}
          <li>
            <Link to={`/portfolio`}>Portfolio</Link>
          </li>

          <li className="separator">|</li>

          {/*Search page*/}
          <li>
            <Link to={`/search`}>
              <FaSearch />
            </Link>
          </li>

          <li className="separator">|</li>

          {/*tags page*/}
          <li>
            <Link to={`/tags`}>
              <FaTags />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
