import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";

// Home page
const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="All posts"/>

      <ul>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title;
        return (
          <li key={node.fields.slug}>
            <Link to={node.fields.slug}>
              {title}
            </Link>
          </li>
        );
      })}
      </ul>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
