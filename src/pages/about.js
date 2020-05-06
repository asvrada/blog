import React from "react";
import Iframe from "react-iframe";
import { graphql } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";

// Home page
const BlogAbout = ({ data }) => {

  return (
    <Layout>
      <SEO title="About"/>
      <h1>About Page</h1>
      <p>Under construction</p>
      <Iframe id="if-imagewall" className="p-0 m-0"
              url="https://asvrada.github.io/vue-imagewall/"/>
    </Layout>
  );
};

export default BlogAbout;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;