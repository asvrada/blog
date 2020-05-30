import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";
import ListGroup from "react-bootstrap/ListGroup";

// Home page
const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="All posts"/>

      <ListGroup variant="flush">
        {posts.map(({ node }) => {
          const date = node.frontmatter.date;
          const title = node.frontmatter.title;
          return (
            <ListGroup.Item action key={node.fields.slug}
                            as={Link} to={node.fields.slug}>
              <div>
                <strong className="m-0">{title}</strong>
              </div>
              <div>
                <small className="m-0">{date}</small>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
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
