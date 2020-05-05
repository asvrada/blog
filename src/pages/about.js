import React from "react";
import { graphql } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";

// Home page
const BlogAbout = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <SEO title="About"/>
      <h1>About Page</h1>
      <p>Under construction</p>
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