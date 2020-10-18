import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";
import ListGroup from "react-bootstrap/ListGroup";
import PostSingleRow from "../components/PostSingleRow";

// Shows all posts
const Posts = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="All Posts"/>

      <div>
        <h1>All Posts</h1>
        <ListGroup variant="flush">
          {posts.map(({ node }) => {
            const postSlug = node.fields.slug;

            return (
              <ListGroup.Item action key={postSlug}
                              as={Link} to={postSlug}>
                <PostSingleRow frontmatter={node.frontmatter}/>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </Layout>
  );
};

export default Posts;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
