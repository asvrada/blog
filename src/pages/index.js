import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";
import PostList from "../components/PostList";

// Home page
const BlogIndex = ({ data }) => {
  const latestPosts = data.latest.edges;

  return (
    <Layout>
      <SEO title="Dashboard"/>

      <div>
        <h1>Latest <Link className="link-view-all" to="/posts/">View All</Link></h1>
        <PostList posts={latestPosts}/>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    latest: allMarkdownRemark(limit: 5,
                              sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title,
            category
          }
        }
      }
    }
  }
`;
