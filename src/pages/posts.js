import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";
import ListGroup from "react-bootstrap/ListGroup";

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
            const postDate = node.frontmatter.date;
            const postTitle = node.frontmatter.title;
            return (
              <ListGroup.Item action key={postSlug}
                              as={Link} to={postSlug}>
                <div>
                  <strong className="m-0">{postTitle}</strong>
                </div>
                <div>
                  <small className="m-0">{postDate}</small>
                </div>
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
            title
          }
        }
      }
    }
  }
`;
